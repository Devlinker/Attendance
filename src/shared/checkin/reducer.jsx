import { LOGOUT, CHECK_IN_SUCCESS, CHECK_IN, CHECK_OUT, CHECK_OUT_SUCCESS, CHECK_IN_FAILURE, CHECK_OUT_FAILURE } from "../ActionTypes";

const INIT_STATE = {
  error: null,
  isAuthenticated: null,
  profile: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHECK_IN:
      return INIT_STATE;
    case CHECK_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.payload,
      };

    case CHECK_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        profile: {},
      };

      case CHECK_OUT:
        return INIT_STATE;
      case CHECK_OUT_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          profile: action.payload,
        };
  
      case CHECK_OUT_FAILURE:
        return {
          ...state,
          error: action.payload,
          isAuthenticated: false,
          profile: {},
        };

    case LOGOUT:
      return INIT_STATE;

    default:
      return state;
  }
};
