import React from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { serviceFactory } from '../../services/serviceFactory';
import { SERVICE_NAME, EQUIPMENT_STATUS, MODAL_TYPE, HTTP_METHOD } from '../../constants';
import { useEssentials } from '../../shared/hooks/useEssentials';
import { useModal } from '../../shared/hooks/useModal';
import '../equipmentUser/equipmentUser.css';

function MyEquipments() {
  const { t } = useTranslation(['common', 'equipmentUser']);
  const essentials = useEssentials();
  const { global } = essentials;
  const { showModal } = useModal();
  const { responseData } = global;

  React.useEffect(() => {
    serviceFactory(
      [{ serviceName: SERVICE_NAME.MY_EQUIPMENTS }],
      essentials,
    );
  }, []);

  const onReturnAEquipment = (id) => {
    showModal({ modalType: MODAL_TYPE.CONFIRM_MODAL, action: returnAEquipment, params: id, callback: [{ serviceName: SERVICE_NAME.MY_EQUIPMENTS }] })
  }

  const returnAEquipment = (id) => {
    serviceFactory(
      [{
        serviceName: SERVICE_NAME.RETURN_A_EQUIPMENT,
        method: HTTP_METHOD.PUT,
        body: {
          equipmentID: id,
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
    switch (item.status) {
      case EQUIPMENT_STATUS.NOT_AVAILABLE:
        return (
          <>
            <Button variant="outline-primary" onClick={() => onReturnAEquipment(item._id)}>{t('equipmentUser:return')}</Button>
          </>
        );
      default:
        return <></>
    }
  }

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Nav className="me-auto" variant="pills" activeKey="2">
          <Nav.Link href="equipment-user">{t('equipment_user')}</Nav.Link>
          <Nav.Link href="my-equipments" eventKey="2">{t('my_equipment', { count: 2 })}</Nav.Link>
        </Nav>
      </Navbar>
      <div className="table-section">
        <Table striped bordered hover>
          <thead>
            <th>{t('name')}</th>
            <th>{t('description')}</th>
            <th>{t('status')}</th>
            <th>{t('action', { count: 2 })}</th>
          </thead>
          <tbody>
            {responseData?.myEquipments?.equipments?.length
              ? (responseData.myEquipments.equipments.map(item => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{getStatus(item.status)}</td>
                  <td>{renderActions(item)}</td>
                </tr>
              )))
              : (<tr>No Data</tr>)
            }
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default MyEquipments;