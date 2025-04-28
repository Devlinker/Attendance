import {
  CHANGE_STATUS,
  CHANGE_STATUS_FAILURE,
  CHANGE_STATUS_SUCCESS,
} from "../ActionTypes";

const INIT_STATE = {
  error: null,
  changestatus: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_STATUS:
      return state;
    case CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        changestatus: action.payload,
      };

    case CHANGE_STATUS_FAILURE:
      return {
        ...state,
        error: action.payload,
        changestatus: {},
      };

    default:
      return state;
  }
};
