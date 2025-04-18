import {WORK_LOGS, WORK_LOGS_SUCCESS, WORK_LOGS_FAILURE } from "../ActionTypes";

const INIT_STATE = {
  error: null,
  logwork: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case WORK_LOGS:
        return INIT_STATE;
  
      case WORK_LOGS_SUCCESS:
        return {
          ...state,
          logwork: action.payload
        };
  
      case WORK_LOGS_FAILURE:
        return {
          ...state,
          error: action.payload,
          logwork: {},
        };
  
  
      default:
        return state;
    }
};