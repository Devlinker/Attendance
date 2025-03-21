import { BASE_URL } from "../ApiEndPoints.jsx";
import { axiosPublic, axiosPrivate } from "../axios.jsx";
import {
  GET_TUTOR,
  GET_TUTOR_SUCCESS,
  GET_TUTOR_FAILURE,
} from "./../ActionTypes.jsx";
// import FileSaver from "file-saver";
// import { downloadExcelFile } from "../../../../utils/utilFunctions.jsx";

export function getTutor(params) {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_TUTOR });
      console.log("asd ");
      const response = await axiosPrivate.get(`${BASE_URL}/user/list/`, {
        params,
      });
      console.log("asd 22");
      if (response.status === 200) {
        dispatch({
          type: GET_TUTOR_SUCCESS,
          payload: {
            data: response.data.data,
            pagination: response.data.pagination,
          },
        });
      } else {
        dispatch({
          type: GET_TUTOR_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: GET_TUTOR_FAILURE,
        payload: err.response ? err.response.data : "An error occurred",
      });
    }
  };
}
