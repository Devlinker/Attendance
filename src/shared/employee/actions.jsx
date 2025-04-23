import {
  ADD_USER,
  ADD_USER_FAILURE,
  ADD_USER_SUCCESS,
  EMPLOYEE_LIST,
  EMPLOYEE_LIST_FAILURE,
  EMPLOYEE_LIST_SUCCESS,
} from "../ActionTypes.jsx";
import { axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";

export function employeelist(params) {
  return async (dispatch) => {
    dispatch({
      type: EMPLOYEE_LIST,
    });
    try {
      const response = await axiosPrivate.get(API_END_POINT.EMPLOYEELIST, {
        params,
      });

      if (response.status === 200) {
        dispatch({
          type: EMPLOYEE_LIST_SUCCESS,
          payload: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: EMPLOYEE_LIST_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {}
  };
}

export function adduser(payload) {
  return async (dispatch) => {
    dispatch({
      type: ADD_USER,
    });
    try {
      const response = await axiosPrivate.post(API_END_POINT.CHECKIN, payload);

      if (response.status === 200) {
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: ADD_USER_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: ADD_USER_FAILURE,
        payload: err.response.data,
      });
    }
  };
}
