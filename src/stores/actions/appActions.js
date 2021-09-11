import { STORE, RESET } from '../../constants';

const storeResponse = responseData => ({
  type: STORE.RESPONSE,
  ...responseData,
});

const storeErrors = errors => ({
  type: STORE.ERRORS,
  ...errors
});

const resetResponse = () => ({
  type: RESET.RESPONSE
});

const storeSuccessfulAPIs = successfulAPIs => ({
  type: STORE.SUCCESSFUL_APIS,
  ...successfulAPIs
});

export {
  storeResponse,
  storeErrors,
  resetResponse,
  storeSuccessfulAPIs
}