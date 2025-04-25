import {LOGOUT, USER_PROFILE_SUCCESS, USER_PROFILE_FAILURE } from "../ActionTypes";

const INIT_STATE = {
  error: null,
  userProfile: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGOUT:
        return INIT_STATE;
  
      case USER_PROFILE_SUCCESS:
        return {
          ...state,
          userProfile: action.payload
        };
  
      case USER_PROFILE_FAILURE:
        return {
          ...state,
          error: action.payload,
          userProfile: {},
        };

        // case CHECK_LOCATION_VALID:
        //   return state;
  
      default:
        return state;
    }
};