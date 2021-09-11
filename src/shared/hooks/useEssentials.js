import { useContext, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Store } from '../../stores/providers/storeProvider';

export const useEssentials = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(Store);
  const { global = {}, modal = {}, loadingState = {} } = state || {};

  const onChangeRoute = url => {
    window.scrollTo(0, 0);
    history.push(url);
  };

  return useMemo(
    () => ({
      dispatch,
      onChangeRoute,
      global,
      modal,
      loadingState,
    }),
    [history, state],
  );
};
