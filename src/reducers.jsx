/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import LoginReducer from "./shared/login";
import UserReducer from "./shared/userlist";

export default function createReducer(history) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    login: LoginReducer,
    user: UserReducer,
  });

  return rootReducer;
}
