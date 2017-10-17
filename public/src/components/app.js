import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import fire from "../config/fire";
import {connect} from "react-redux";
import * as actions from '../reducers/actions.js';

import Body from './layout/body';
import LoginUser from "./users/login";
import LogOut from "./users/logout";
import CreateUser from './users/create';
import Topics from './topics/manage';
import Board from './board/view';
import AdminArea from './admin/admin';

import { Route } from 'react-router-dom';

class App extends Component {

  componentWillMount = () => {
    fire.auth().onAuthStateChanged(user => {
      if (!user) this.props.loggedout();
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Body logged_in={this.props.logged_in} email={this.props.email} role={this.props.role}>
          <Route exact path="/" render={props => <LoginUser {...this.props} />} />
          <Route path="/logout" render={props => <LogOut loggedout={this.props.loggedout} />} />
          <Route path="/admin" render={props => <AdminArea {...this.props} />} />
          <Route path="/topics" render={props => <Topics {...this.props} />} />
          <Route path="/create" render={props => <CreateUser signup_success={this.props.signup_success} logged_in={this.props.logged_in} />} />
          <Route path="/board" render={props => <Board {...this.props} />} />
        </Body>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state){
  return {
    topic_list: state.listReducer.topic_list,
    list_all: state.listReducer.list_all,
    uid: state.auth.uid,
    email: state.auth.email,
    role: state.auth.role,
    token: state.auth.token,
    logged_in: state.auth.logged_in,
  }
}

export default connect(mapStateToProps, actions)(App);