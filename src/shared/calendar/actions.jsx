import { CALENDAR, CALENDAR_FAILURE, CALENDAR_SUCCESS } from "../ActionTypes";
import { axiosPrivate } from "../axios";
import * as API_END_POINT from "../ApiEndPoints.jsx";

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
    } catch (err) {
      console.log(err);
      //   dispatch({
      //     type: CALENDAR_FAILURE,
      //     payload: err.response.data,
      //   });
    }
  };
}
