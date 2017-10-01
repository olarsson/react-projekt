import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import Layout from './layout';
import fire from "./config/fire";
import reducer from './reducers/reducer.js';
import {Provider, connect} from "react-redux";
import App from "./components/app";
//import routes from './routes';

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';


const store = createStore(reducer, {}, applyMiddleware(reduxThunk));

/*
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
,
  document.getElementById("root")
);
*/


ReactDOM.render(
  <Layout>
    <BrowserRouter>
      <div>
        <Provider store={store}>
          <div>
            <App />
          </div>
        </Provider>
      </div>
    </BrowserRouter>
  </Layout>,
  document.getElementById("root")
);
