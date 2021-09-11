import React from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

import { serviceFactory } from '../../services/serviceFactory';
import { SERVICE_NAME, EQUIPMENT_STATUS, MODAL_TYPE, HTTP_METHOD } from '../../constants';
import { useEssentials } from '../../shared/hooks/useEssentials';
import { useModal } from '../../shared/hooks/useModal';
import './equipmentAdmin.css';

function EquipmentAdmin() {
  const { t } = useTranslation(['common', 'equipmentAdmin']);
  const { showModal } = useModal();
  const essentials = useEssentials();
  const { global } = essentials;
  const { responseData } = global;

  React.useEffect(() => {
    serviceFactory(
      [{ serviceName: SERVICE_NAME.GET_ALL_EQUIPMENTS }],
      essentials,
    );
  }, []);

  const onShowCreateEditModal = (equipmentInfo = {}) => {
    showModal({ modalType: MODAL_TYPE.CREATE_EDIT_EQUIPMENT_MODAL, equipmentInfo, callback: [{ serviceName: SERVICE_NAME.GET_ALL_EQUIPMENTS }] });
  }

  const onShowConfirmModal = (id) => {
    showModal({ modalType: MODAL_TYPE.CONFIRM_MODAL, action: onDeleteAEquipment, params: id, callback: [{ serviceName: SERVICE_NAME.GET_ALL_EQUIPMENTS }] })
  }

  const onDeleteAEquipment = (id) => {
    serviceFactory(
      [{
        serviceName: SERVICE_NAME.DELETE_A_EQUIPMENT,
        method: HTTP_METHOD.DELETE,
        body: {
          equipmentID: id,
        },
        t
      }],
      essentials
    );
  }

  const onApprove = (id) => {
    showModal({ modalType: MODAL_TYPE.CONFIRM_MODAL, action: onEditStatusEquipment, params: {id, status: EQUIPMENT_STATUS.NOT_AVAILABLE}, callback: [{ serviceName: SERVICE_NAME.GET_ALL_EQUIPMENTS }] })
  }

  const onReject = (id) => {
    showModal({ modalType: MODAL_TYPE.CONFIRM_MODAL, action: onEditStatusEquipment, params: {id, status: EQUIPMENT_STATUS.AVAILABLE}, callback: [{ serviceName: SERVICE_NAME.GET_ALL_EQUIPMENTS }] })
  }

  const onEditStatusEquipment = ({ id, status }) => {
    serviceFactory(
      [{
        serviceName: SERVICE_NAME.EDIT_STATUS_EQUIPMENT,
        method: HTTP_METHOD.PUT,
        body: {
          equipmentID: id,
          status
        },
        t
      }],
      essentials
    );
  }

  const getStatus = (statusCode) => {
    switch (statusCode) {
      case EQUIPMENT_STATUS.WAITING_FOR_APPROVAL:
        return t('waiting_for_approval');
      case EQUIPMENT_STATUS.NOT_AVAILABLE:
        return t('not_available');
      default:
        return t('available')
    }
  }

  const renderActions = (item) => {
    if (item?.status) {
      switch (item.status) {
        case EQUIPMENT_STATUS.WAITING_FOR_APPROVAL:
          return (
            <>
              <Button variant="outline-success" onClick={() => onApprove(item._id)}>{t('equipmentAdmin:approve')}</Button>
              <Button variant="outline-secondary" onClick={() => onReject(item._id)}>{t('equipmentAdmin:reject')}</Button>
            </>
          );
        case EQUIPMENT_STATUS.AVAILABLE:
          return (
            <>
              <Button variant="outline-secondary" onClick={() => onShowCreateEditModal(item)}>{t('equipmentAdmin:edit')}</Button>
              <Button variant="outline-danger" onClick={() => onShowConfirmModal(item._id)}>{t('equipmentAdmin:delete')}</Button>
            </>
          );
        default:
          return <></>
      }
    }
  }

  return (
    <div>
      <Button variant="outline-primary" onClick={() => onShowCreateEditModal()}>{t('equipmentAdmin:add')}</Button>
      <Table striped bordered hover>
        <thead>
          <th>{t('name')}</th>
          <th>{t('description')}</th>
          <th>{t('status')}</th>
          <th>{t('action', { count: 2 })}</th>
        </thead>
        <tbody>
          {responseData?.getAllEquipments?.equipments?.length
            ? (responseData.getAllEquipments.equipments.map(item => (
              <tr>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{getStatus(item.status)}</td>
                <td className='actions-section'>{renderActions(item)}</td>
              </tr>
            )))
            : (
              <tr>
                <td></td>
                <td></td>
                <td>{t('no_data')}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  );
}

export default EquipmentAdmin;