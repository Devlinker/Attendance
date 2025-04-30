import { axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
} from "../ActionTypes.jsx";

export function changepassword(user_id, params , cb) {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD,
    });
    try {
      const response = await axiosPrivate.put(
        `${API_END_POINT.CHANGEPASSWORD}${user_id}`,
        params
      );

      if (response.status === 200) {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: response.data,
        });
        console.log(response?.data?.message, "test");
        cb && cb(response?.data?.message);
      } else if (response.status === 400) {
        dispatch({
          type: CHANGE_PASSWORD_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {}
  };
}
