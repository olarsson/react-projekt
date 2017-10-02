import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import Layout from "./layout";
//import fire from "./config/fire";
import reducer from "./reducers/reducer.js";
//import {Provider, connect} from "react-redux";
import App from "./components/app";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import { Provider } from "react-redux";
import { Route, Switch } from 'react-router-dom';
//import { Router, Route, browserHistory } from 'react-router' //--- se react-router-dom ovan som nu använder Router, Route

import SignIn from "./users/signin_user";
import AdminArea from './admin_area';

//import SignIn from "./users/signin_user";

//import routes from './routes';

const store = createStore(reducer, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/*
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <App/>
      </Layout>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
*/