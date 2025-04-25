import {
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_FAILURE,
  EDIT_EMPLOYEE_SUCCESS,
  EMPLOYEE_LIST,
  EMPLOYEE_LIST_FAILURE,
  EMPLOYEE_LIST_SUCCESS,
  GET_EMPLOYEE_DETAILS,
  GET_EMPLOYEE_DETAILS_FAILURE,
  GET_EMPLOYEE_DETAILS_SUCCESS,
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

export function addemployee(payload, cb) {
  return async (dispatch) => {
    dispatch({
      type: ADD_EMPLOYEE,
    });
    try {
      const response = await axiosPrivate.post(
        API_END_POINT.ADDEMPLOYEE,
        payload
      );

      if (response.status === 200) {
        dispatch({
          type: ADD_EMPLOYEE_SUCCESS,
          payload: response.data,
        });
        cb && cb();
      } else if (response.status === 400) {
        dispatch({
          type: ADD_EMPLOYEE_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: ADD_EMPLOYEE_FAILURE,
        payload: err.response.data,
      });
    }
  };
}

export function editemployee(id, payload, cb) {
  return async (dispatch) => {
    dispatch({
      type: EDIT_EMPLOYEE,
    });
    try {
      const response = await axiosPrivate.put(`${API_END_POINT.EDITEMPLOYEE}${id}`,
        payload,
      );

      if (response.status === 200) {
        dispatch({
          type: EDIT_EMPLOYEE_SUCCESS,
          payload: response.data,
        });
        cb && cb();
      } else if (response.status === 400) {
        dispatch({
          type: EDIT_EMPLOYEE_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {}
  };
}

export function getemployeedetails(id) {
  return async (dispatch) => {
    dispatch({
      type: GET_EMPLOYEE_DETAILS,
    });
    try {
      const response = await axiosPrivate.get(
        `${API_END_POINT.GETEMPLOYEEDETAILS}${id}`
      );

      if (response.status === 200) {
        dispatch({
          type: GET_EMPLOYEE_DETAILS_SUCCESS,
          payload: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: GET_EMPLOYEE_DETAILS_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {}
  };
}
