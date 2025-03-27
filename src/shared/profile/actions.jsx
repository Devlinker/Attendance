import { axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
import { USER_PROFILE, USER_PROFILE_FAILURE, USER_PROFILE_SUCCESS } from "../ActionTypes";

export function getUserProfile() {
    return async (dispatch) => {
      dispatch({
        type: USER_PROFILE,
      });
      try {
        const response = await axiosPrivate.get(API_END_POINT.PROFILE);
  
        if (response.status === 200) {
          dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: response.data,
          });
        } else if (response.status === 400) {
          dispatch({
            type: USER_PROFILE_FAILURE,
            payload: response.data,
          });
        }
      } catch (err) {
        dispatch({
          type: USER_PROFILE_FAILURE,
          payload: err.response.data,
        });
      }
    };
  }