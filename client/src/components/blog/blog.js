import React, { Component } from "react";
import fire from "../../config/fire";
import MakeBlogPost from './post';

function deleteBlogAndComments(e, that, blogid) {
  
  if (that.props.token) {
    fetch("/admin_delete_blog_and_comments", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        blogid: blogid,
        token: that.props.token
      })
    })
    .then(response => response.json())
    .then(json => {
      console.info('deleteBlogAndComments: ', json)
      that.forceUpdate()
      if (json.result === "success") {
        //that.setState({users: json.users})
        that.forceUpdate()
      }
    });
  }

}

class Blog extends Component {
  state = {
    blogposts: []
  };

  componentWillMount() {
    if (this.props.logged_in) this.getBlogPosts();
  }

  getBlogPosts() {
    var that = this;
    fire.database().ref("blog").orderByChild("created").once("value").then(function(snaps) {
      let x = [],
      i = 0;
      snaps.forEach(snapshot => {
        i++;
        x.push({
          id: snapshot.key,
          created: snapshot.val().created,
          text: snapshot.val().text,
          key: i
        });
      });
      that.setState({blogposts: x})
    })
    .catch(error => {
      console.info(error);
    });
  }

  none(e) {
    e.preventDefault();
  }

  printPosts() {
    return (
      this.state.blogposts.map((post, i) => {
        return (
          <div className="blogpost" key={i}>
            <div>Post id: {post.id}</div>
            <div>Text: {post.text}</div>
            <div>Created: {post.created}</div>
            <button onClick={(e, that, blogid) => deleteBlogAndComments(e, this, post.id)}>Delete</button>
          </div>
        )
      })
    );
  }

  returnedFunc() {
    if (this.props.logged_in) {
      return (
        <div>
          <h3>All posts</h3>
          {this.printPosts()}
          <p>-----</p>
          {<MakeBlogPost token={this.props.token}/>}
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

export default Blog;