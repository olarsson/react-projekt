import React, { Component } from "react";
import fire from "../../config/fire";
import MakePost from "./make_post";

class ViewPosts extends Component {
  state = {
    blogposts: [],
    posts: []
  };

  componentWillMount() {
    if (this.props.logged_in) {
      this.getBlogPosts();
      this.getPosts();
    }
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
          postedby: snapshot.val().postedby,
          created: snapshot.val().created,
          text: snapshot.val().text,
          likes: snapshot.val().likes,
          key: i
        });
      });
      that.setState({blogposts: x})
      //that.props.bloglist(x)
    })
    .catch(error => {
      console.info(error);
    });
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
          reference: snapshot.val().reference,
          key: i
        });
      });
      that.setState({posts: x})
    })
    .catch(error => {
      console.info(error);
    });
  }



  deleteComment(e, token, postid) {

    console.info({
      postid: postid,
      token: token
    })
    
    if (token) {
      fetch("/admin_delete_comment", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postid: postid,
          token: token
        })
      })
      .then(response => response.json())
      .then(json => {
        console.info('deleteComment: ', json)
        //if (json.result === "success") {
          //that.setState({users: json.users})
          //that.forceUpdate()
        //}
      });
    }
  
  }


  none(e) {
    e.preventDefault();
  }


  printPosts() {
    var token = this.props.token;
    return (
      this.state.blogposts.map((blogpost, i) => {
        return (
          <div className="blogpost" key={i}>
            <div>Blogpost id: {blogpost.id}</div>
            <div>Blog Text: {blogpost.text}</div>
            <div>Blog Created: {blogpost.created}</div>
            <div>Blog Postedby: {blogpost.postedby}</div>
            {blogpost.likes ? <div>Likes: post.likes.length</div> : ''}
            {
              this.state.posts.map((post, ii) => {
                {/*console.info(blogpost.id, post.reference)*/}
                if (blogpost.id === post.reference) {
                  return (
                    <div className="post" key={ii}>
                      <div>Post id: {post.id}</div>
                      <div>Text: {post.text}</div>
                      <div>Created: {post.created}</div>
                      <div>Postedby: {post.postedby}</div>
                      <button onClick={(e, token, postid) => this.deleteComment(e, this.props.token, post.id)}>Delete comment</button>
                    </div>
                  )
                }
              }, blogpost.id)
            }
            <button onClick={this.none} className="makepost_visible">Comment</button>
            <MakePost token={this.props.token} reference={blogpost.id}/>
          </div>
        )
      })
    );
  }


  /*

  printPosts() {
    return (
      this.state.posts.map((post, i) => {
        return (
          <div className="post" key={i}>
            <div>Post id: {post.id}</div>
            <div>Text: {post.text}</div>
            <div>Created: {post.created}</div>
            <div>Postedby: {post.postedby}</div>
            {post.likes ? <div>Likes: post.likes.length</div> : ''}
            <button onClick={this.none} className="makepost_visible">Make post</button>
            <MakePost token={this.props.token} reference={post.id}/>
          </div>
        )
      })
    );
  }
*/
  returnedFunc() {
    if (this.props.logged_in) {
      return (
        <div>
          <h3>All posts</h3>
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