import { useCallback } from 'react';
import { serviceFactory } from '../../services/serviceFactory';
import { setModal } from '../../stores/actions/modalActions';
import { handleMessage } from '../../utils';
import { useEssentials } from './useEssentials';

export const useModal = () => {
  const essentials = useEssentials();
  const { modal, dispatch } = essentials;

  const showModal = useCallback(data => {
    const { modalType, message, ...rest } = data;
    dispatch(
      setModal({
        ...modal,
        message: message ? handleMessage(message) : '',
        isShowModal: true,
        modalType,
        ...rest
      }),
    );
  });

  const closeModal = e => {
    if (e) {
      e.preventDefault();
    }
    const { callback, redirectURL, errors, callbackModalType, callbackFunction, argument } = modal;
    dispatch(setModal(callbackModalType ? { modalType: callbackModalType } : { isShowModal: false }));
    // wait for transition close then clear modal state
    setTimeout(() => {
      !callbackModalType && dispatch(setModal());
    }, 300);
    if (callback) {
      serviceFactory(callback, essentials);
    }
    if (redirectURL) {
      // sessionStorage.clear();
      window.onbeforeunload = null;
      const msg = (errors && `msg=${handleMessage(errors)}`) || '';
      window.location.assign(redirectURL + msg);
    }
    if (callbackFunction && argument) {
      callbackFunction(argument);
    }
  };

  return { showModal, closeModal, ...modal };
};
