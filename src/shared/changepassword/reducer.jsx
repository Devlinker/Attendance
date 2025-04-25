import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
} from "../ActionTypes";

const INIT_STATE = {
  error: null,
  isAuthenticated: null,
  password: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return state;
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        password: action.payload,
      };

    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        password: {},
      };

    default:
      return state;
  }
};
