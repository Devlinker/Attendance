import { axiosPublic, axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
import { SIGNUP_INIT, SIGNUP_ERROR, SIGNUP_SUCCESS } from "../ActionTypes.jsx";

export function Signup(formData) {
  return async (dispatch) => {
    dispatch({
      type: SIGNUP_INIT,
    });
    try {
      const response = await axiosPublic.post(API_END_POINT.SIGNUP, formData);
      console.log(response, "response pass");

      if (response.status === 200) {
        const dataObject = response.data;
        axiosPrivate.defaults.headers.common.Authorization = `Bearer ${dataObject.data.access_token}`;
        localStorage.setItem("token", dataObject.data.access_token);
        localStorage.setItem("refreshtoken", dataObject.data.refresh_token);
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: response.data,
        });
      } else if (response.status !== 200) {
        dispatch({
          type: SIGNUP_ERROR,
          payload: response.data,
        });
        console.log(response, "response failed");
      }
    } catch (err) {
      alert(err?.response?.data?.message);
      dispatch({
        type: SIGNUP_ERROR,
        payload: err?.response?.data,
      });
    }
  };
}
