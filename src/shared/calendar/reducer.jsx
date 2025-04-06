import { CALENDAR_FAILURE, CALENDAR_SUCCESS } from "../ActionTypes";

const INIT_STATE = {
  error: null,
  calender: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // case LOGOUT:
    //     return INIT_STATE;

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

    default:
      return state;
  }
};
