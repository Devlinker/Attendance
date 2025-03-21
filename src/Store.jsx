import { createStore, compose, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import {thunk} from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import createReducer from "./reducers";
import { createBrowserHistory } from "history";

/* eslint-disable */

const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const rootReducer = createReducer(history);
const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore() {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    reduxImmutableStateInvariant(),
    thunk,
    reactRouterMiddleware,
  ];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store, null, () => {
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__();
  });

  if (import.meta.hot) {
    import.meta.hot.accept("./reducers", () => {
      const newRootReducer = require("./reducers").default;
      store.replaceReducer(newRootReducer(history));
    });
  }

  return { store, persistor };
}

export default configureStore;
