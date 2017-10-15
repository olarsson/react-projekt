import React from "react";
import ReactDOM from "react-dom";

import listReducer from "./reducers/list.js";
import auth from "./reducers/auth.js";

import App from "./components/app";
import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";

const store = createStore(combineReducers({
    auth,
    listReducer
  }),
  /* preloadedState, */ window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);