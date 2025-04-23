import {
  ADD_USER,
  ADD_USER_FAILURE,
  ADD_USER_SUCCESS,
  EMPLOYEE_LIST,
  EMPLOYEE_LIST_FAILURE,
  EMPLOYEE_LIST_SUCCESS,

} from "../ActionTypes";
import { employeelist } from "./actions";

const INIT_STATE = {
  error: null,
  isAuthenticated: null,
  employeelist: {},
  adduser: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST:
      return INIT_STATE;
    case EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        employeelist: action.payload,
      };

    case EMPLOYEE_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        employeelist: {},
      };

    case ADD_USER:
      return state;
    case ADD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userslist: action.payload,
      };

    case ADD_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        userslist: {},
      };

    default:
      return state;
  }

};

