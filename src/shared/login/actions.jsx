import { axiosPublic, axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
// import { useNavigate } from "react-router-dom";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_INIT,
} from "../ActionTypes.jsx";

export function login(formData, cb , errcb ) {
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
        console.log(response?.data?.message , 'login');
        
        cb && cb(response?.data?.message)
        console.log(LOGIN_INIT );
      } else if (response.status === 400) {
        dispatch({
          type: LOGIN_ERROR,
          payload: response.data,
        });

        console.log(response?.data , 'error')
        errcb && errcb (response)
      }
    } catch (err) {
      dispatch({
        type: LOGIN_ERROR,
        payload: err?.response?.data,
      });
      console.log(err?.response?.data?.message, "error 2");
      errcb && errcb(err?.response?.data?.message);
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
