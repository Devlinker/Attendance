/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import LoginReducer from "./shared/reducer/login";

export default function createReducer(history) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    login: LoginReducer,

  });

  return rootReducer;
}
