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
import './equipmentUser.css';

function EquipmentUser() {
  const { t } = useTranslation(['common', 'equipmentUser']);
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

  const onBookAEquipment = (id) => {
    showModal({ modalType: MODAL_TYPE.CONFIRM_MODAL, action: bookAEquipment, params: id, callback: [{ serviceName: SERVICE_NAME.GET_ALL_EQUIPMENTS }] })
  }

  const bookAEquipment = (id) => {
    serviceFactory(
      [{
        serviceName: SERVICE_NAME.BOOK_A_EQUIPMENT,
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
      case EQUIPMENT_STATUS.AVAILABLE:
        return (
          <>
            <Button variant="outline-primary" onClick={() => onBookAEquipment(item._id)}>{t('equipmentUser:book')}</Button>
          </>
        );
      default:
        return <></>
    }
  }

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Nav className="me-auto" variant="pills" activeKey="1">
          <Nav.Link href="equipment-user" eventKey="1">{t('equipment_user')}</Nav.Link>
          <Nav.Link href="my-equipments">{t('my_equipment', { count: 2 })}</Nav.Link>
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
            {responseData?.getAllEquipments?.equipments?.length
              ? (responseData.getAllEquipments.equipments.map(item => (
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

export default EquipmentUser;