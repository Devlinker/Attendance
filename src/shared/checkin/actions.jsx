import { axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
import { CHECK_IN, CHECK_IN_FAILURE, CHECK_IN_SUCCESS, CHECK_OUT, CHECK_OUT_FAILURE, CHECK_OUT_SUCCESS } from "../ActionTypes";

export function checkin(payload) {
    return async (dispatch) => {
      dispatch({
        type: CHECK_IN,
      });
      try {
        const response = await axiosPrivate.post(API_END_POINT.CHECKIN,payload);
  
        if (response.status === 200) {
          dispatch({
            type: CHECK_IN_SUCCESS,
            payload: response.data,
          });
        } else if (response.status === 400) {
          dispatch({
            type: CHECK_IN_FAILURE,
            payload: response.data,
          });
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
        const response = await axiosPrivate.post(API_END_POINT.CHECKIN,payload);
  
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