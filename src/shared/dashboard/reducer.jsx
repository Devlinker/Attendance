import {
  LOGOUT,
  CHECK_IN_SUCCESS,
  CHECK_IN,
  CHECK_OUT,
  CHECK_OUT_SUCCESS,
  CHECK_IN_FAILURE,
  CHECK_OUT_FAILURE,
  WORK_LOGS,
  WORK_LOGS_SUCCESS,
  WORK_LOGS_FAILURE,
  CALENDAR_FAILURE,
  CALENDAR_SUCCESS,
  REGULARIZE_SUCCESS,
  REGULARIZE_FAILURE,
  REGULARIZE,
} from "../ActionTypes";

const INIT_STATE = {
  error: null,
  isAuthenticated: null,
  checkin: {},
  calender: [],
  logwork: {},
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHECK_IN:
      return state;
    case CHECK_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        checkin: action.payload,
      };

    case CHECK_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        checkin: {},
      };

    case CHECK_OUT:
      return state;
    case CHECK_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        checkin: action.payload,
      };

    case CHECK_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        checkin: {},
      };

    case LOGOUT:
      return state;

    case CALENDAR_SUCCESS:
      return {
        ...state,
        calender: action.payload,
      };

    case CALENDAR_FAILURE:
      return {
        ...state,
        error: action.payload,
        calender: {},
      };

    case WORK_LOGS:
      return state;

    case WORK_LOGS_SUCCESS:
      return {
        ...state,
        logwork: action.payload,
      };

    case WORK_LOGS_FAILURE:
      return {
        ...state,
        error: action.payload,
        logwork: {},
      };

    case REGULARIZE:
      return state;

    case REGULARIZE_SUCCESS:
      return {
        ...state,
        regularize: action.payload,
      };

    case REGULARIZE_FAILURE:
      return {
        ...state,
        error: action.payload,
        regularize: {},
      };

    default:
      return state;
  }
};
