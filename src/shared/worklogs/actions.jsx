import { axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
import {
  WORK_LOGS,
  WORK_LOGS_FAILURE,
  WORK_LOGS_SUCCESS,
} from "../ActionTypes";

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
