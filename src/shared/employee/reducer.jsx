import {
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_FAILURE,
  EDIT_EMPLOYEE_SUCCESS,
  EMPLOYEE_LIST,
  EMPLOYEE_LIST_FAILURE,
  EMPLOYEE_LIST_SUCCESS,
  GET_EMPLOYEE_DETAILS,
  GET_EMPLOYEE_DETAILS_FAILURE,
  GET_EMPLOYEE_DETAILS_SUCCESS,
} from "../ActionTypes";

const INIT_STATE = {
  error: null,
  employeeListLoader: false,
  employeelist: [],
  pagination: {
    total: 0,
    pageSize: 10,
    current: 1,
  },
  addemployee: {},
  editemployee: {},
  getemployeedetails: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST:
      return { ...state, employeeListLoader: true };
    case EMPLOYEE_LIST_SUCCESS:
      return {
        ...state,
        employeeListLoader: false,
        employeelist: action.payload?.data || [],
        pagination: {
          total: action.payload?.pagination?.total_count,
          current: action.payload?.current,
          pageSize: action?.payload?.pageSize,
        },
      };

    case EMPLOYEE_LIST_FAILURE:
      return {
        ...state,
        employeeListLoader: false,
        error: action.payload,
        employeelist: {},
      };

    case ADD_EMPLOYEE:
      return state;
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        addemployee: action.payload,
      };

    case ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
        addemployee: {},
      };

    case EDIT_EMPLOYEE:
      return state;
    case EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        editemployee: action.payload,
      };

    case EDIT_EMPLOYEE_FAILURE:
      return {
        ...state,
        error: action.payload,
        editemployee: {},
      };

    case GET_EMPLOYEE_DETAILS:
      return state;
    case GET_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        getemployeedetails: action.payload,
      };

    case GET_EMPLOYEE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
        getemployeedetails: {},
      };

    default:
      return state;
  }
};
