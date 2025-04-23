import {
  COMPANY_LIST,
  COMPANY_LIST_FAILURE,
  COMPANY_LIST_SUCCESS,
} from "../ActionTypes";

const INIT_STATE = {
  error: null,
  isAuthenticated: null,
  company: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case COMPANY_LIST:
      return INIT_STATE;
    case COMPANY_LIST_SUCCESS:
      return {
        ...state,
        company: action.payload,
      };

    case COMPANY_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
        company: {},
      };

    default:
      return state;
  }
};
