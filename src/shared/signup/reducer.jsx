import {
  SIGNUP_INIT,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT,
} from "../ActionTypes";

const INIT_STATE = {
  error: null,
  isAuthenticated: null,
  profile: {},
  userProfile: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_INIT:
      return INIT_STATE;
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.payload,
      };

    case SIGNUP_ERROR:
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
