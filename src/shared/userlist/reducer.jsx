import {
  GET_TUTOR,
  GET_TUTOR_SUCCESS,
  GET_TUTOR_FAILURE,
} from "../ActionTypes";

const INIT_STATE = {
  TUTORLIST: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TUTOR:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_TUTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        TUTORLIST: {
          data: action.payload.data,
          pagination: action.payload.pagination,
        },
      };
    case GET_TUTOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
