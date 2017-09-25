import React, { Component } from "react";
import fire from "../config/fire";

class MakePost extends Component {

  state = {
    posts: []
  };

  make_post(e) {

    e.preventDefault();

    fire.database().ref("posts").push({
      postedby: "afhlk8jIUm",
      text: "hello world",
      created: 20170105,
      likes: {}
    }).then(res => {
      console.info(res)
    });

  }



  handleMessage(e) {
    this.setState({message: e.target.value});
  }

  render() {
    return (
      <div>
        <h4>Make post</h4>
        <form onSubmit={this.make_post.bind(this)}>
          <input type="text" name="message" placeholder="Message" value={this.state.message} onChange={this.handleMessage.bind(this)} /><br/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default MakePost;