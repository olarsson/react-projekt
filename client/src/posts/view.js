import React, { Component } from "react";
import fire from "../config/fire";
import MakePost from "./make_post";
import store from '../store';

class ViewPosts extends Component {

  state = {
    posts: []
  };

  posts(e) {

    e.preventDefault();

    fire.database().ref("posts").orderByChild("created").once("value").then(function(snaps) {
      
      let x = [], i = 0;
      snaps.forEach(snapshot => {
        i++;
        /*x.push({
          uid: snapshot.val().uid,
          uid_users: snapshot.key,
          email: snapshot.val().email,
          key: i
        })*/
      });
      //self.setState({users: x})

      return '<b>posts out</b>';

    });

  }

  returnedFunc() {
    console.log('in out: ' + store.getState().logged_in)
    if (store.getState().logged_in) {
      return (
        <div>
          <h3>View posts</h3>
          {this.posts}
          <MakePost/>
        </div>
      )
    } else {
      return (
        <p>You need to be logged in.</p>
      )
    }
  }

  render() {
    return(
      <div>
      { this.returnedFunc() }
      </div>
    )
  }

}

export default ViewPosts;

/*
  render() {
    return (
      <div>
        <h3>View posts</h3>
        {this.posts}
        <MakePost/>
      </div>
    );
  }
  */
