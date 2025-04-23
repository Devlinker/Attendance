import {
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_SUCCESS,
  EMPLOYEE_LIST,
  EMPLOYEE_LIST_FAILURE,
  EMPLOYEE_LIST_SUCCESS,

} from "../ActionTypes";

const INIT_STATE = {
  error: null,
  isAuthenticated: null,
  employeelist: {},
  addemployee: {},
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

    case ADD_EMPLOYEE:
      return state;
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        addemployee: action.payload,
      };

    case ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        addemployee: {},
      };

    default:
      return state;
  }

};

