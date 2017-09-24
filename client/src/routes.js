import React from "react";
import CreateUser from "./users/create_user";
import SignIn from "./users/signin_user";
import SignOut from "./users/signout_user";
import AdminArea from './admin_area';
import ViewPosts from './posts/view';
import { Route, Switch } from 'react-router-dom';

const routes = (
  <Switch>
    <Route path="/create" component={CreateUser} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signout" component={SignOut} />
    <Route path="/admin" component={AdminArea} />
    <Route path="/posts" component={ViewPosts} />
  </Switch>
);

export default routes;