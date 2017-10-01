import React, { Component } from "react";
//import CreateUser from "./users/create_user";
import SignIn from "./users/signin_user";
//import SignOut from "./users/signout_user";
import AdminArea from './admin_area';
//import ViewPosts from './posts/view';
import { Route, Switch } from 'react-router-dom';

/*
const routes = (
  <Switch>
    <Route path="/create" component={CreateUser} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signout" component={SignOut} />
    <Route path="/admin" component={AdminArea} />
    <Route path="/posts" component={ViewPosts} />
  </Switch>
);
*/

const routes = (
  
  <Switch>
    <Route path='/signin' component={SignIn} {...this.props} />
    <Route path="/admin" component={AdminArea} {...this.props} />
  </Switch>
);

export default routes;

/*

const routes = (
  <Switch>
    <Route path="/signin" component={SignIn} {...this.props}/>
    <Route exact path='/signin' render={(props) => (
      <SignIn {...props}/>
    )}/>    
    <Route path="/admin" component={AdminArea} {...this.props}/>
  </Switch>
);
*/