import { useTranslation } from 'react-i18next';
import { ServiceProcessor } from './ServiceProcessor';
import { SERVICE_NAME, ROUTE_PATH, MODAL_TYPE, STATUS_CODE } from '../constants';
import { handleMessage } from '../utils';
import { setModal } from '../stores/actions/modalActions';
import MyEquipments from '../modules/myEquipments';

const showModal = async ({
  errors,
  dispatch,
  isError = true,
  modalType = MODAL_TYPE.RESULT_MODAL,
  successMessage,
  ...rest
}) => {
  await dispatch(
    setModal({
      isShowModal: true,
      modalType,
      message: handleMessage(isError ? errors : successMessage),
      status: isError ? STATUS_CODE.BadRequest : STATUS_CODE.Success,
      ...rest,
    }),
  );
  return { isError };
};

const callService = async request => {
  const { dispatch, successMessage = '', callback } = request;
  const res = await ServiceProcessor(request);
  const { errors, isError } = res;
  if (isError) {
    return showModal({ errors, dispatch });
  }
  return successMessage
    ? showModal({ successMessage, dispatch, isError, callback })
    : res;
};

const login = async request => {
  const { dispatch, onChangeRoute } = request;
  const res = await ServiceProcessor(request);
  const { response, errors, isError } = res || {};
  if (isError) {
    return showModal({ errors, dispatch });
  }
  const { authToken, userInfo } = response;
  await localStorage.setItem('token_em', authToken);
  if (userInfo?.isAdmin) {
    return onChangeRoute(ROUTE_PATH.EQUIPMENTS_ADMIN);
  }
  return onChangeRoute(ROUTE_PATH.EQUIPMENTS_USER);
};

const getAllEquipments = async request => {
  const { dispatch } = request;
  const res = await ServiceProcessor(request);
  const { errors, isError } = res || {};
  if (isError) {
    return showModal({ errors, dispatch });
  }
  return res;
};

const createAEquipment = async request => {
  const { dispatch, t} = request;
  const res = await ServiceProcessor(request);
  const { errors, isError } = res || {};
  if (isError) {
    return showModal({ errors, dispatch });
  }
  return showModal({ ...res, ...request, message: t('equipmentAdmin:create_equipment_successfully_message') });
}

const editAEquipment = async request => {
  const { dispatch, t} = request;
  const res = await ServiceProcessor(request);
  const { errors, isError } = res || {};
  if (isError) {
    return showModal({ errors, dispatch });
  }
  return showModal({ ...res, ...request, message: t('equipmentAdmin:edit_equipment_successfully_message') });
}

const editStatusEquipment = async request => {
  const { dispatch, t} = request;
  const res = await ServiceProcessor(request);
  const { errors, isError } = res || {};
  if (isError) {
    return showModal({ errors, dispatch });
  }
  return showModal({ ...res, ...request, message: t('equipmentAdmin:edit_status_equipment_successfully_message') });
}

const deleteAEquipment = async request => {
  const { dispatch, t} = request;
  const res = await ServiceProcessor(request);
  const { errors, isError } = res || {};
  if (isError) {
    return showModal({ errors, dispatch });
  }
  return showModal({ ...res, ...request, message: t('equipmentAdmin:delete_equipment_successfully_message') });
}

const getMyEquipments = async request => {
  const { dispatch } = request;
  const res = await ServiceProcessor(request);
  const { errors, isError } = res || {};
  if (isError) {
    return showModal({ errors, dispatch });
  }
  return res;
};

const bookAEquipment = async request => {
  const { dispatch, t} = request;
  const res = await ServiceProcessor(request);
  const { errors, isError } = res || {};
  if (isError) {
    return showModal({ errors, dispatch });
  }
  return showModal({ ...res, ...request, message: t('equipmentUser:book_equipment_successfully_message') });
}

const returnAEquipment = async request => {
  const { dispatch, t} = request;
  const res = await ServiceProcessor(request);
  const { errors, isError } = res || {};
  if (isError) {
    return showModal({ errors, dispatch });
  }
  return showModal({ ...res, ...request, message: t('equipmentUser:return_equipment_successfully_message') });
}

export const serviceFactory = async (services, essentials) => {
  const res = await Promise.all(
    services.map(service => {
      const request = { ...service, ...essentials };
      const { serviceName } = service;
      switch (serviceName) {
        case SERVICE_NAME.LOGIN:
          return login(request);
        case SERVICE_NAME.GET_ALL_EQUIPMENTS:
          return getAllEquipments(request);
        case SERVICE_NAME.CREATE_A_EQUIPMENT:
          return createAEquipment(request);
        case SERVICE_NAME.EDIT_A_EQUIPMENT:
          return editAEquipment(request);
        case SERVICE_NAME.DELETE_A_EQUIPMENT:
          return deleteAEquipment(request);
        case SERVICE_NAME.EDIT_STATUS_EQUIPMENT:
          return editStatusEquipment(request);
        case SERVICE_NAME.MY_EQUIPMENTS:
          return getMyEquipments(request);
        case SERVICE_NAME.BOOK_A_EQUIPMENT:
          return bookAEquipment(request);
        case SERVICE_NAME.RETURN_A_EQUIPMENT:
          return returnAEquipment(request);
        default:
          return callService(request);
      }
    }),
  );
  const data = res.reduce((prev, cur) => ({ ...prev, ...cur }), {});
  return data;
};