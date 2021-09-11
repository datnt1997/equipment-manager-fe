import { STORE } from '../../constants';

const increaseLoading = () => ({
  type: STORE.LOADING.INCREASE,
});

const decreaseLoading = () => ({
  type: STORE.LOADING.DECREASE,
});

const resetLoading = () => ({
  type: STORE.LOADING.RESET,
});

export { increaseLoading, decreaseLoading, resetLoading };
