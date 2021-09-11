import * as React from 'react';
import appReducer from '../reducers/appReducer';
import loadingReducer from '../reducers/loadingReducer';
import modalReducer from '../reducers/modalReducer';

export const Store = React.createContext({});

const initialState = {
  global: { responseData: {}, errors: {}, successfulAPIs: {}, sideMenu: 1 },
  modal: {},
  loadingState: { loading: 0 },
};

export const StoreProvider = props => {
  const [state, dispatch] = React.useReducer(
    combineReducers(appReducer, modalReducer, loadingReducer),
    initialState,
  );
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
};

const combineReducers = (...reducers) => (state = initialState, action) => {
  reducers.forEach((reducer, index) => {
    state = reducers[index](state, action);
  });
  return state;
};
