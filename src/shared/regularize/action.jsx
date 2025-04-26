import {
  REGULARIZE,
  REGULARIZE_SUCCESS,
  REGULARIZE_FAILURE,
  REGULARIZE_LIST,
  REGULARIZE_LIST_SUCCESS,
  REGULARIZE_LIST_FAILURE,
} from "../ActionTypes";

import { axiosPrivate } from "../axios";
import * as API_END_POINT from "../ApiEndPoints";

// fetch regularize listing
export const fetchRegularizeList = (page = 1, items = 10) => {
  return async (dispatch) => {
    dispatch({ type: REGULARIZE_LIST });
    try {
      const res = await axiosPrivate.get(API_END_POINT.REGULARIZE_LIST, {
        params: {
          paginate: 1,
          page: Number(page) || 1,
          items: Number(items) || 10,
        },
      });

      // Log the response to verify the structure
      console.log("API Response:", res.data);

      dispatch({ type: REGULARIZE_LIST_SUCCESS, payload: res.data });
    } catch (err) {
      console.error("API Error:", err);
      dispatch({
        type: REGULARIZE_LIST_FAILURE,
        payload: err?.response?.data,
      });
    }
  };
};

// approve/reject put
export const submitRegularize = (payload, cb) => {
  return async (dispatch) => {
    dispatch({ type: REGULARIZE });
    try {
      const res = await axiosPrivate.put(
        API_END_POINT.REGULARIZE_POST,
        payload
      );
      dispatch({ type: REGULARIZE_SUCCESS, payload: res.data });
      cb && cb();
    } catch (err) {
      dispatch({
        type: REGULARIZE_FAILURE,
        payload: err?.response?.data,
      });
    }
  };
};
