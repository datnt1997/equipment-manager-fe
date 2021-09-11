import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import * as Yup from 'yup';

import { useModal } from '../hooks/useModal';
import { useEssentials } from '../hooks/useEssentials';
import { serviceFactory } from '../../services/serviceFactory';
import { HTTP_METHOD, SERVICE_NAME } from '../../constants';

const validationSchema = (t) =>
  Yup.object({
    name: Yup.string().required(t('required_field')),
  });

function CreateEditEquipmentModal() {
  const {
    isShowModal,
    closeModal,
    equipmentInfo = {}
  } = useModal();
  const essentials = useEssentials();
  const { t } = useTranslation(['common', 'equipmentAdmin']);
  const values = { name: !isEmpty(equipmentInfo) ? equipmentInfo.name : '', description: !isEmpty(equipmentInfo) ? equipmentInfo.description : '' }

  const onSaveEquipment = (values) => {
    let serviceObject = {
      serviceName: SERVICE_NAME.CREATE_A_EQUIPMENT,
      method: HTTP_METHOD.POST,
      body: { ...values },
      t
    }
    if (!isEmpty(equipmentInfo)) {
      serviceObject = Object.assign({ ...serviceObject }, {
        serviceName: SERVICE_NAME.EDIT_A_EQUIPMENT,
        body: {
          equipmentID: equipmentInfo._id,
          info: { ...values }
        },
        method: HTTP_METHOD.PUT
      });
    }
    serviceFactory(
      [serviceObject],
      essentials
    );
  }

  return (
    <Modal show={isShowModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{!isEmpty(equipmentInfo) ? t('equipmentAdmin:edit_equipment') : t('equipmentAdmin:create_equipment')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={values}
        values={values}
        validationSchema={validationSchema(t)}
        onSubmit={onSaveEquipment}
      >
        {({ handleChange, values, errors, handleSubmit }) => (
          <Form>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>{t('name')}:</Form.Label>
                <Form.Control
                  type="text" name='name'
                  value={values.name} onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>{t('description')}:</Form.Label>
                <Form.Control
                  type="text" name='description'
                  value={values.description} onChange={handleChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                {t('cancel')}
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                {t('save')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default CreateEditEquipmentModal;