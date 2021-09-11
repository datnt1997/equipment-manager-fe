import { CONFIG, HTTP_METHOD, SERVICE_NAME, STATUS_CODE } from '../constants';
import { storeResponse, storeSuccessfulAPIs, storeErrors } from '../stores/actions/appActions';
import {
  decreaseLoading,
  increaseLoading,
} from '../stores/actions/loaderActions';

const buildHeaders = header => {
  let headers = {
    'Content-Type': 'application/json'
  };
  const token = localStorage.getItem('token_em');
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }
  if (header) {
    headers = { ...headers, ...header };
  }
  return { headers };
};

const handleHTTPCode = res => {
  const { status, statusText } = res || {};
  if (status >= STATUS_CODE.BadRequest || status < STATUS_CODE.Success) {
    return { errors: [`${status} ${statusText}`], successful: false, status };
  }
  switch (status) {
    case STATUS_CODE.NoContent:
      return { response: [], status: STATUS_CODE.NoContent, successful: true };
    default:
      return null;
  }
};

const buildUrl = ({ serviceName }) => {
  const configUrl = `${process.env.REACT_APP_API_ENDPOINT}${CONFIG[serviceName]}`;
  return configUrl;
};

const storeRes = async ({ responses, storeMapper, serviceName, dispatch }) => {
  const { response, status } = responses;
  const data = status
    ? (!!storeMapper && storeMapper(response)) || response
    : responses;
  return dispatch(
    storeResponse({ [serviceName]: data, dataType: serviceName }),
  );
};

export const ServiceProcessor = async ({
  method = HTTP_METHOD.GET,
  body,
  headers,
  serviceName,
  storeMapper,
  dispatch,
}) => {
  try {
    await dispatch(increaseLoading());
    //NOTE: Always reset API variable in successfulAPIs when call API
    await dispatch(storeSuccessfulAPIs({ dataType: serviceName, [serviceName]: false }));
    const header = buildHeaders(headers);
    const options = { method, body: JSON.stringify(body), ...header };
    const url = buildUrl({ serviceName });
    const res = await fetch(url, options);
    const resHTTP = await handleHTTPCode(res);
    const responses = resHTTP || (await res.json());
    const { errors, successful, status } = responses;
    if (errors?.length > 0 && !successful) {
      await dispatch(decreaseLoading());
      await dispatch(storeErrors(errors));
      if (
        status === STATUS_CODE.Unauthorized &&
        serviceName !== SERVICE_NAME.LOGIN
      ) {
        localStorage.removeItem('token_em');
      }
      return { ...responses, isError: true };
    }
    await storeRes({ responses, storeMapper, serviceName, dispatch });
    await dispatch(decreaseLoading());
    //NOTE: This case when call API successful
    await dispatch(storeSuccessfulAPIs({ dataType: serviceName, [serviceName]: true }));
    return { ...responses, isError: false };
  } catch (err) {
    await dispatch(decreaseLoading());
    return { errors: err, isError: true };
  }
};