import React, { Component } from "react";
//import ReactDOM from 'react-dom';
//import { BrowserRouter, Link } from 'react-router-dom';
//import Layout from './layout';
//import fire from "./config/fire";
//import routes from './routes';
//import store from './store';
//import user from './reducers/reducer.js';
import {connect} from "react-redux";
import Test from './test';
import * as actions from './actions/actions.js';

class App extends Component {

  state = {
    log: false
  }  

  componentDidMount() {
    console.info('<App/>: ', this.props)
  }

  render() {
    return (
      <div>
        <ul>
        { /*(store.getState().logged_in ? <li>signed in</li> : <li>signed out</li>)*/ } 
        <Test {...this.props}/>
        </ul>
      </div>
    )
  }


}

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

export default connect(null, actions)(App);
