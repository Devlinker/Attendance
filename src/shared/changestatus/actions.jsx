import { axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
import {
  CHANGE_STATUS,
  CHANGE_STATUS_FAILURE,
  CHANGE_STATUS_SUCCESS,
} from "../ActionTypes.jsx";

// export function changestatus(params, user_id) {
//   return async (dispatch) => {
//     dispatch({
//       type: CHANGE_STATUS,
//     });
//     try {
//       const response = await axiosPrivate.put(`${API_END_POINT.CHANGESTATUS}${user_id}`, {
//         params,
//       });

//       if (response.status === 200) {
//         dispatch({
//           type: CHANGE_STATUS_SUCCESS,
//           payload: response.data,
//         });
//       } else if (response.status === 400) {
//         dispatch({
//           type: CHANGE_STATUS_FAILURE,
//           payload: response.data,
//         });
//       }
//     } catch (err) {}
//   };
// }

export function changestatus(isActive, user_id, cb) {
  return async (dispatch) => {
    dispatch({ type: CHANGE_STATUS });

    const payload = {
      employee_status: isActive ? "active" : "inactive",
    };

    try {
      const response = await axiosPrivate.put(
        `${API_END_POINT.CHANGESTATUS}${user_id}`,
        payload
      );

      if (response.status === 200) {
        dispatch({
          type: CHANGE_STATUS_SUCCESS,
          payload: response.data,
        });
        cb && cb();
      } else if (response.status === 400) {
        dispatch({
          type: CHANGE_STATUS_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: CHANGE_STATUS_FAILURE,
        payload: err.response?.data || "Something went wrong",
      });
    }
  };
}
