import {
  PROJECTS_LIST,
  PROJECTS_LIST_SUCCESS,
  PROJECTS_LIST_FAILURE,
} from "../ActionTypes";

const INIT_STATE = {
  error: null,
  isAuthenticated: null,
  projects: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PROJECTS_LIST:
      return INIT_STATE;
    case PROJECTS_LIST_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      };

    case PROJECTS_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
        projects: {},
      };

    default:
      return state;
  }
};
