import React, { Component } from "react";
//import ReactDOM from 'react-dom';
//import { BrowserRouter, Link } from 'react-router-dom';
//import Layout from './layout';
//import fire from "./config/fire";
//import routes from './routes';
//import store from './store';
import {connect} from "react-redux";

class TestChild extends Component {
  upd() {
    this.props.changemsg();
  }  
  render() {
    return (
      <div>
        TestChild props: {this.props.log}
        <button onClick={this.upd.bind(this)}>testchild > reflect state</button>
      </div>
    )
  }
}

class Test extends Component {
  upd() {
    this.props.changemsg();
    //console.info('<Test/> props: ', + this.props.log)
  }
  render() {
    return (
      <div>
        <button onClick={this.upd.bind(this)}>test > reflect state</button>
        <TestChild {...this.props}/>
      </div>
    )
  }
}

// connect application state to props
function mapStateToProps(state) {
  //console.info('mapStateToProps', state)
  return { log: state.log };
  //return {state}
}

export default connect(mapStateToProps, null)(Test);

//export default Test;