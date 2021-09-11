import { STORE } from '../../constants';

const modalReducer = (state, action = {}) => {
  switch (action.type) {
    case STORE.MODAL:
      if (action.modal) {
        return {
          ...state,
          modal: {
            ...state.modal,
            ...action.modal,
          },
        };
      }
      return { ...state, modal: {} };
    default:
      return state;
  }
};

export default modalReducer;
