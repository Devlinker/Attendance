import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, LOGIN_INIT } from "../ActionTypes";

const INIT_STATE = {
  error: null,
  isAuthenticated: null,
  profile: {},
  userProfile: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return INIT_STATE;
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.payload,
      };

    case LOGIN_ERROR:
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
