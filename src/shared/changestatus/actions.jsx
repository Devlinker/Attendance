import { axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
import {
  CHANGE_STATUS,
  CHANGE_STATUS_FAILURE,
  CHANGE_STATUS_SUCCESS,
} from "../ActionTypes.jsx";

export function changepassword(params) {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_STATUS,
    });
    try {
      const response = await axiosPrivate.get(API_END_POINT.CHANGESTATUS, {
        params,
      });

      if (response.status === 200) {
        dispatch({
          type: CHANGE_STATUS_SUCCESS,
          payload: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: CHANGE_STATUS_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {}
  };
}
