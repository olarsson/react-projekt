import React, { Component } from "react";
import fire from "../../config/fire";
import MakePost from "./make_post";

class ViewPosts extends Component {
  state = {
    posts: []
  };

  componentWillMount() {
    this.getPosts();
  }

  getPosts() {
    var that = this;
    fire.database().ref("posts").orderByChild("created").once("value").then(function(snaps) {
      let x = [],
      i = 0;
      snaps.forEach(snapshot => {
        i++;
        x.push({
          id: snapshot.key,
          postedby: snapshot.val().postedby,
          created: snapshot.val().created,
          text: snapshot.val().text,
          likes: snapshot.val().likes,
          key: i
        });
      });
      that.setState({posts: x})
    })
    .catch(error => {
      console.info(error);
    });
  }

  printPosts() {
    return (
      this.state.posts.map((post, i) => {
        return (
          <div className="post" key={i}>
            <div>Text: {post.text}</div>
            <div>Created: {post.created}</div>
            <div>Postedby: {post.postedby}</div>
            {post.likes ? <div>Likes: post.likes.length</div> : ''}
            <MakePost/>
          </div>
        )
      })
    );
  }

  returnedFunc() {
    if (this.props.logged_in) {
      return (
        <div>
          <h3>View posts</h3>
          {this.printPosts()}
        </div>
      );
    } else {
      return <p>You need to be logged in.</p>;
    }
  }

  render() {
    return <div>{this.returnedFunc()}</div>;
  }
}

export default ViewPosts;