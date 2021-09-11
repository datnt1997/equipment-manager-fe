import { STORE } from '../../constants';

const loadingReducer = (state, action) => {
  const { loadingState } = state;
  const { loading } = loadingState;
  switch (action.type) {
    case STORE.LOADING.INCREASE:
      return {
        ...state,
        loadingState: { ...loadingState, loading: loading + 1 },
      };
    case STORE.LOADING.DECREASE:
      return {
        ...state,
        loadingState: { ...loadingState, loading: loading - 1 },
      };
    case STORE.LOADING.RESET:
      return {
        ...state,
        loadingState: { ...loadingState, loading: 0 },
      };
    default:
      return state;
  }
};

export default loadingReducer;
