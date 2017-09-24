import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import Layout from './layout';
import fire from "./config/fire";
import routes from './routes';

import { createStore } from 'redux'

const user = (state = {logged_in: false}, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return {
        uid: action.uid,
        email: action.email,
        logged_in: true
      }
    case 'LOGGED_OUT':
      return {
        logged_in: false
      }
    default:
      return state
  }
}

export let store = createStore(user,
  +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() =>
  console.info('state: ' + store.getState().logged_in)
)

class App extends Component {

  state = {
    log: false
  }  

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch({ type: 'LOGGED_IN', user: user.uid, email: user.email })
      } else {
        store.dispatch({ type: 'LOGGED_OUT' });
      }
      this.setState({log: Boolean(user)})
    });  
  }

  render() {
    return (
      <div>
        <ul>
        { (store.getState().logged_in ? <li><Link to="/signout">Sign out</Link></li> : <li><Link to="/signin">Sign in</Link></li>) } 
        { (store.getState().logged_in ? '' : <li><Link to="/create">Create user</Link></li>) }
        { (store.getState().logged_in ? <li><Link to="/admin">View users</Link></li> : '') }
        { (store.getState().logged_in ? <li><Link to="/posts">View posts</Link></li> : '') }
        </ul>
        { routes }
      </div>
    )
  }

}

ReactDOM.render(
  <Layout>
    <BrowserRouter>
      <div>
        <App />
      </div>
    </BrowserRouter>
  </Layout>,
  document.getElementById("root")
);