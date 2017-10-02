import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import Layout from '../layout';
import Header from './header'
import Footer from './footer'
//import fire from "./config/fire";
//import routes from './routes';
//import store from './store';
//import user from './reducers/reducer.js';
import {connect} from "react-redux";
//import Test from '../test';
import * as actions from '../reducers/actions.js';
//import routes from '../routes';


import SignIn from "../users/signin_user";
import AdminArea from '../admin_area';
//import { Route } from 'react-router'
import { Route, Switch } from 'react-router-dom';
import { Router, browserHistory } from 'react-router' //--- se react-router-dom ovan som nu använder Router, Route
//import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/signin" render={props => <SignIn {...this.props} />} />
          <Route path="/admin" component={AdminArea} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);

/*
class App extends Component {
  render() {
    return (
      <ul>
        <div>App component</div>
        <Route path="/signin" render={props => <SignIn {...props} />} />
        <Route path="/admin" component={AdminArea} {...this.props} />
      </ul>
    );
  }
}
*/


/*
class App extends Component {

  render() {
    return (
      <div>
        <div>App component</div>
        <Route path="/signin" component={SignIn} {...this.props} />
        <Route path="/admin" component={AdminArea} {...this.props} />        
      </div>
    );
  }
}
*/

/*
function mapStateToProps(state) {
  return {
    logggg: 'testloggg'
  }
}

function mapDispatchToProps() {
  return {
    //changemsg: () => store.dispatch({type: 'LOGCHANGE'})
  }
}*/

