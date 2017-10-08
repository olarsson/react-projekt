import React, { Component } from "react";
import $ from 'jquery';

class MakePost extends Component {

  state = {
    posts: [],
    message: ''
  };

  make_post(e) {

    e.preventDefault();

    let message = $(e.target).find('[name=message]')[0].value,
    token = this.props.token,
    btn = $(e.target).find('[type=submit]')[0];

    if (!btn.disabled) {
      btn.disabled = true;
      fetch("/make_post", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },    
        body: JSON.stringify({
          'message' : message,
          'token' : token
        })
      })
      .then(response => response.json())
      .then(json => {
        //console.info("/makepost : ", json)
        btn.disabled = false;
      })
      .catch(error => {
        console.info("/makepost error : ", error)
        btn.disabled = false;
      })
    }

  }

  handleMessage(e) {
    this.setState({message: e.target.value});
  }

  render() {
    return (
      <div className="makepost">
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