import { STORE, RESET } from '../../constants';

const appReducer = (state, action) => {
  const { global } = state;
  const { responseData, errors, successfulAPIs } = global;
  const { type: actionType, dataType, ...payload } = action;
  switch (actionType) {
    case STORE.RESPONSE: {
      // Prevent re-render when api same as state
      const isChange = !(
        JSON.stringify(responseData[dataType]) ===
        JSON.stringify(payload[dataType])
      );
      if (isChange) {
        return {
          ...state,
          global: { ...global, responseData: { ...responseData, ...payload } },
        };
      }
      return state;
    }
    case STORE.ERRORS: {
      // Prevent re-render when api same as state
      let isChange = !(
        JSON.stringify(errors[dataType]) ===
        JSON.stringify(payload[dataType])
      );
      if (isChange) {
        return {
          ...state,
          global: { ...global, errors: { ...errors, ...payload } },
        };
      }
      return state;
    }
    case RESET.RESPONSE: {
      return {
        ...state,
        global: { ...global, responseData: {} },
      };
    }
    case STORE.SUCCESSFUL_APIS: {
      // Prevent re-render when api same as state
      let isChange = !(
        JSON.stringify(successfulAPIs[dataType]) ===
        JSON.stringify(payload[dataType])
      );
      if (isChange) {
        return {
          ...state,
          global: { ...global, successfulAPIs: { ...successfulAPIs, ...payload } },
        };
      }
      return state;
    }
    case STORE.EMPTY_STATE:
      return {};
    case STORE.SIDE_MENU:
      return { ...state, global: { ...global, ...payload } };
    default:
      return state;
  }
};

export default appReducer;
