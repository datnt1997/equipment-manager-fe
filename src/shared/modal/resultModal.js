import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import { useModal } from '../hooks/useModal';

function ResultModal() {
  const { t } = useTranslation(['common']);
  const {
    isShowModal,
    closeModal,
    message
  } = useModal();

  return (
    <Modal show={isShowModal} onHide={closeModal}>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={closeModal}>
          {t('ok')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultModal;