import { axiosPublic, axiosPrivate } from "../../axios.jsx";
import * as API_END_POINT from "../../ApiEndPoints.jsx";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
//   LOGOUT,
  LOGIN_INIT,
//   USER_PROFILE_FAILURE,
//   USER_PROFILE_SUCCESS,
//   USER_PROFILE
} from "../../ActionTypes.jsx";

export function login(formData) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_INIT,
    });
    try {
      const response = await axiosPublic.post(API_END_POINT.LOGIN, {
        email: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        const dataObject = response.data;
        axiosPrivate.defaults.headers.common.Authorization = `Bearer ${dataObject.data.access_token}`;
        localStorage.setItem("token", dataObject.data.access_token);
        localStorage.setItem('refreshtoken', dataObject.data.refresh_token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: LOGIN_ERROR,
          payload: response.data,
        });
      }
    } catch (err) {
      dispatch({
        type: LOGIN_ERROR,
        payload: err?.response?.data,
      });
    }
  };
}