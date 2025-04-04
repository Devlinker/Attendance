import { axiosPublic, axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
// import { useNavigate } from "react-router-dom";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_INIT,
} from "../ActionTypes.jsx";

export function login(formData) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_INIT,
    });
    try {
      const response = await axiosPublic.post(API_END_POINT.LOGIN, formData);

      if (response.status === 200) {
        const dataObject = response.data;
        axiosPrivate.defaults.headers.common.Authorization = `Bearer ${dataObject.data.access_token}`;
        localStorage.setItem("token", dataObject.data.access_token);
        localStorage.setItem("refreshtoken", dataObject.data.refresh_token);
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

export function logoutAction() {
  return async (dispatch) => {
    localStorage.clear();
    axiosPrivate.defaults.headers.common.Authorization = "";
    await dispatch({
      type: LOGOUT,
    });
  };
}
