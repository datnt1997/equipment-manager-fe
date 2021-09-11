import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import { useModal } from '../hooks/useModal';

function ConfirmModal() {
  const { t } = useTranslation(['common']);
  const {
    isShowModal,
    closeModal,
    action,
    params = {}
  } = useModal();

  const onOK = () => {
    action(params);
  }

  return (
    <Modal show={isShowModal} onHide={closeModal}>
      <Modal.Body>
        {t('are_you_sure')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          {t('cancel')}
        </Button>
        <Button variant="primary" onClick={onOK}>
          {t('ok')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;