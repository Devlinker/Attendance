import { axiosPrivate } from "../axios.jsx";
import * as API_END_POINT from "../ApiEndPoints.jsx";
import {
  PROJECTS_LIST,
  PROJECTS_LIST_FAILURE,
  PROJECTS_LIST_SUCCESS,
} from "../ActionTypes.jsx";

export function getProjects(params) {
  return async (dispatch) => {
    dispatch({
      type: PROJECTS_LIST,
    });
    try {
      const response = await axiosPrivate.get(API_END_POINT.PROJECTS, {
        params,
      });

      if (response.status === 200) {
        dispatch({
          type: PROJECTS_LIST_SUCCESS,
          payload: response.data,
        });
      } else if (response.status === 400) {
        dispatch({
          type: PROJECTS_LIST_FAILURE,
          payload: response.data,
        });
      }
    } catch (err) {}
  };
}
