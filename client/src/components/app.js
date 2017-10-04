import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import fire from "../config/fire";
import {connect} from "react-redux";
import * as actions from '../reducers/actions.js';

//import routes from '../routes';
import SignIn from "../users/signin_user";
import SignOut from "../users/signout_user";
import AdminArea from '../admin_area';
import CreateUser from '../users/create_user';

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
        <Layout logged_in={this.props.logged_in} email={this.props.email}>
          <Route path="/signin" render={props => <SignIn {...this.props} />} />
          <Route path="/signout" render={props => <SignOut loggedout={this.props.loggedout} />} />
          <Route path="/admin" render={props => <AdminArea {...this.props} />} />
          <Route path="/create" render={props => <CreateUser signup_success={this.props.signup_success} logged_in={this.props.logged_in} />} />
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
    logged_in: state.logged_in
  }
}

export default connect(mapStateToProps, actions)(App);

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

