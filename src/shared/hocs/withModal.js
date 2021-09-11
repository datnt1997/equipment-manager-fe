import React from 'react';
import { MODAL_TYPE } from '../../constants';
import { useModal } from '../hooks/useModal';
import ConfirmModal from '../modal/confirmModal';
import ResultModal from '../modal/resultModal';
import CreateEditEquipmentModal from '../modal/createEditEquipment';

export const withModal = WrappedComponent => props => {
  const { modalType, isShowModal } = useModal();
  return (
    <>
      <WrappedComponent {...props} />
      {(isShowModal || modalType) &&
        (() => {
          switch (modalType) {
            case MODAL_TYPE.CREATE_EDIT_EQUIPMENT_MODAL:
              return <CreateEditEquipmentModal />
            case MODAL_TYPE.CONFIRM_MODAL:
              return <ConfirmModal />;
            case MODAL_TYPE.RESULT_MODAL:
              return <ResultModal />;
            default:
              return <></>;
          }
        })()}
    </>
  );
};
