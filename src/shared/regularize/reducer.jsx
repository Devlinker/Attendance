import {
  REGULARIZE,
  REGULARIZE_SUCCESS,
  REGULARIZE_FAILURE,
  REGULARIZE_LIST,
  REGULARIZE_LIST_SUCCESS,
  REGULARIZE_LIST_FAILURE,
} from "../ActionTypes";

const INIT_STATE = {
  loading: false,
  error: null,
  regularizeList: [],
  actionResult: {},
  pagination: {
    total: 0,
    pageSize: 10,
    current: 1,
  },
};

export default function regularizeReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case REGULARIZE:
    case REGULARIZE_LIST:
      return { ...state, loading: true };

    case REGULARIZE_LIST_SUCCESS:
      console.log("Action Payload:", action.payload); // Log the payload
      return {
        ...state,
        loading: false,
        regularizeList: action.payload?.data || [], // Assuming your API response has a "data" key
        pagination: {
          total: action.payload?.pagination?.total_count || 0,
          pageSize: action.payload?.pagination?.items || 10,
          current: action.payload?.pagination?.page || 1,
        },
      };

    case REGULARIZE_LIST_FAILURE:
    case REGULARIZE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
