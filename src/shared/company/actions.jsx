import { axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
import {
  COMPANY_LIST,
  COMPANY_LIST_FAILURE,
  COMPANY_LIST_SUCCESS,
} from "../ActionTypes.jsx";

export function getcompanyies(params) {
  return async (dispatch) => {
    dispatch({
      type: COMPANY_LIST,
    });
    try {
      const response = await axiosPrivate.get(API_END_POINT.COMPANY, {
        params,
      });

      if (response.status === 200) {
        dispatch({
          type: COMPANY_LIST_SUCCESS,
          payload: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: COMPANY_LIST_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {}
  };
}
