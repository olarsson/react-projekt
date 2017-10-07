import React from "react";
import ReactDOM from "react-dom";
//import fire from "./config/fire";
import reducer from "./reducers/reducer.js";
//import {Provider, connect} from "react-redux";
import App from "./components/app";

import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";

//import styles from './public/style.css';
//import { Router, Route, browserHistory } from 'react-router' //--- se react-router-dom ovan som nu använder Router, Route

//import routes from './routes';

//const store = createStore(reducer, {}, applyMiddleware(reduxThunk));

const store = createStore(
  reducer,
  /* preloadedState, */ window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);