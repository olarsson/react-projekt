import React, { Component } from "react";
import fire from "../../config/fire";
import MakeBlogPost from './post';
import $ from 'jquery';

class Blog extends Component {

  state = {
    blogposts: []
  };

  deleteBlogAndComments(e, that, blogid) {
    
    let btn = e.target;
  
    if (!btn.disabled) {
      btn.disabled = true;
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
        btn.disabled = false;
        if (json.result === "success") {
          this.getBlogPosts(that);
        }
      });
    }
  
  }  

  
  componentWillMount() {
    if (this.props.logged_in) this.getBlogPosts(this);
  }
  

  /*componentDidMount() {
    if (this.props.logged_in) this.getBlogPosts(this);
  }*/

  /*
  componentDidMount() {
    this.setState({blogposts: []})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ denom: nextProps.denom })
  }
  */

  getBlogPosts(that) {
    //var that = this;
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
/*      
      that.setState({blogposts: x}, () => {
        that.setState({update: true});
      })*/
      console.info("that.props.bloglist::::", that.props.bloglist)
      that.props.bloglist(x)
      //that.forceUpdate();
    })
  }

  none(e) {
    e.preventDefault();
  }

  printPosts() {

    /*
    return (
      this.props.blog_posts.map((post, i) => {
        return (
          <div className="blogpost" key={i}>
            <div>Post id: {post.id}</div>
            <div>Text: {post.text}</div>
            <div>Created: {post.created}</div>
            <button onClick={(e, that, blogid) => this.deleteBlogAndComments(e, this, post.id)}>Delete</button>
          </div>
        )
      })
    );

    */
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