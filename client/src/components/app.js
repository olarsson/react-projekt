import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import fire from "../config/fire";
import {connect} from "react-redux";
import * as actions from '../reducers/actions.js';

//import routes from '../routes';
import Layout from './layout/layout';

import LoginUser from "./users/login";
import LogOut from "./users/logout";
import CreateUser from './users/create';

import ViewPosts from './posts/view';

import AdminArea from './admin/admin';

//import { Route } from 'react-router'
import { Route } from 'react-router-dom';
//import { browserHistory } from 'react-router' //--- se react-router-dom ovan som nu använder Router, Route
//import { Route, Switch } from 'react-router-dom';

class App extends Component {

  componentWillMount = () => {
    fire.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.loggedout();
      }
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Layout logged_in={this.props.logged_in} email={this.props.email} role={this.props.role}>
          <Route path="/login" render={props => <LoginUser {...this.props} />} />
          <Route path="/logout" render={props => <LogOut loggedout={this.props.loggedout} />} />
          <Route path="/admin" render={props => <AdminArea {...this.props} />} />
          <Route path="/create" render={props => <CreateUser signup_success={this.props.signup_success} logged_in={this.props.logged_in} />} />
          <Route path="/posts" render={props => <ViewPosts {...this.props} />} />
          {/*routes(this.props)*/}
        </Layout>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state){
  return {
    uid: state.uid,
    email: state.email,
    password: state.password,
    role: state.role,
    token: state.token,
    logged_in: state.logged_in
  }
}

export default connect(mapStateToProps, actions)(App);