import React, { Component } from "react";
import $ from 'jquery';

class MakeComment extends Component {

  state = {
    posts: [],
    message: '',
    error_post: null
  };

  make_comment(e) {

    e.preventDefault();

    let message = $(e.target).find('[name=message]')[0].value,
    token = this.props.token,
    reference = this.props.reference || 0,
    btn = $(e.target).find('[type=submit]')[0];

    if (!btn.disabled) {
      btn.disabled = true;
      fetch("/board/make_comment", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },    
        body: JSON.stringify({
          'message' : message,
          'token' : token,
          'reference' : reference
        })
      })
      .then(response => response.json())
      .then(json => {
        this.props.getBoard(this);
        if (json.message === "success") {
          this.setState({error_post: null})
        } else {
          this.setState({error_post: json.message})
        }
        btn.disabled = false;
      })
      .catch(error => {
        btn.disabled = false;
        this.setState({error_post: error.message})
      })
    }

  }

  handleMessage(e) {
    this.setState({message: e.target.value});
  }

  render() {
    return (
      <div className="makecomment">
        <h4>Make post</h4>
        {/*console.info(this.state.error_post)*/}
        {this.state.error_post !== null ? <p>Error2: {this.state.error_post}</p> : ''}
        <form onSubmit={this.make_comment.bind(this)}>
          <textarea name="message" placeholder="Message" value={this.state.message} onChange={this.handleMessage.bind(this)}></textarea>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default MakeComment;