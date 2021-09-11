import { STORE } from '../../constants';

const setModal = modal => ({
  type: STORE.MODAL,
  modal,
});

export { setModal };