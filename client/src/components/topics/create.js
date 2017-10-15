import React, { Component } from "react";
import $ from 'jquery';

class CreateTopic extends Component {

  state = {
    error: null,
    message: ''
  };

  create_topic(e) {

    e.preventDefault();

    let message = $(e.target).find('[name=message]')[0].value,
    token = this.props.token,
    btn = $(e.target).find('[type=submit]')[0];

    if (!btn.disabled) {
      btn.disabled = true;
      fetch("/topic/create", {
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
        if (json.result === "success") {
          this.props.gettopics_and_comments(this)
          this.setState({error: null})
        } else {
          this.setState({error: json.message})
        }
        btn.disabled = false;
      })
      .catch(error => {
        btn.disabled = false;
        this.setState({error: error.message})
      })
    }

  }

  handleMessage(e) {
    this.setState({message: e.target.value});
  }

  render() {
    return (
      <div className="makecomment">
        <h4>Create new topic</h4>
        <form onSubmit={this.create_topic.bind(this)}>
          {(this.state.error !== null ? <p>Error: {this.state.error}</p> : '')}
          <textarea name="message" placeholder="Message" value={this.state.message} onChange={this.handleMessage.bind(this)}></textarea>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateTopic;