import { axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
import {
  CHECK_IN,
  CHECK_IN_FAILURE,
  CHECK_IN_SUCCESS,
  CHECK_OUT,
  CHECK_OUT_FAILURE,
  CHECK_OUT_SUCCESS,
  CALENDAR,
  CALENDAR_FAILURE,
  CALENDAR_SUCCESS,
  WORK_LOGS,
  WORK_LOGS_FAILURE,
  WORK_LOGS_SUCCESS,
  REGULARIZE,
  REGULARIZE_SUCCESS,
  REGULARIZE_FAILURE,
} from "../ActionTypes.jsx";

export function checkin(payload, successCb, errorcb) {
  return async (dispatch) => {
    dispatch({
      type: CHECK_IN,
    });
    try {
      const response = await axiosPrivate.post(API_END_POINT.CHECKIN, payload);

      if (response.status === 200) {
        dispatch({
          type: CHECK_IN_SUCCESS,
          payload: response.data,
        });
        successCb && successCb(response?.message);
      } else if (response.status === 400) {
        dispatch({
          type: CHECK_IN_FAILURE,
          payload: response.data,
        });
        errorcb && errorcb(response?.data?.message);
      }
    } catch (err) {
      dispatch({
        type: CHECK_IN_FAILURE,
        payload: err.response.data,
      });
    }
  };
}

export function checkout(payload) {
  return async (dispatch) => {
    dispatch({
      type: CHECK_OUT,
    });
    try {
      const response = await axiosPrivate.post(API_END_POINT.CHECKIN, payload);

      if (response.status === 200) {
        dispatch({
          type: CHECK_OUT_SUCCESS,
          payload: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: CHECK_OUT_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: CHECK_OUT_FAILURE,
        payload: err.response.data,
      });
    }
  };
}

export function getCalender(params) {
  return async (dispatch) => {
    dispatch({
      type: CALENDAR,
    });
    try {
      const response = await axiosPrivate.get(API_END_POINT.CALENDAR, {
        params,
      });

      if (response.status === 200) {
        dispatch({
          type: CALENDAR_SUCCESS,
          payload: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: CALENDAR_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {}
  };
}

export function worklogs() {
  return async (dispatch) => {
    dispatch({
      type: WORK_LOGS,
    });
    try {
      const response = await axiosPrivate.get(API_END_POINT.WORKLOGS);

      if (response.status === 200) {
        dispatch({
          type: WORK_LOGS_SUCCESS,
          payload: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: WORK_LOGS_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: WORK_LOGS_FAILURE,
        payload: err.response.data,
      });
    }
  };
}

export function regularize(payload, cb, errCb) {
  return async (dispatch) => {
    dispatch({
      type: REGULARIZE,
    });
    try {
      const response = await axiosPrivate.post(
        API_END_POINT.REGULARIZE,
        payload
      );
      if (response.status === 201) {
        dispatch({
          type: REGULARIZE_SUCCESS,
          payload: response.data,
        });
        cb && cb(response?.data?.message);
      } else if (response.status === 400 || response.status === 500) {
        dispatch({
          type: REGULARIZE_FAILURE,
          payload: response?.data || "",
        });
        errCb && errCb(response?.data?.message);
      }
    } catch (err) {
      dispatch({
        type: REGULARIZE_FAILURE,
        payload: err?.response?.data || "API Error",
      });
      errCb && errCb(err?.response?.data?.message);
    }
  };
}
