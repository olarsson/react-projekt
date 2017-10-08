import React, { Component } from "react";
import fire from "../../config/fire";
import $ from 'jquery';

class MakePost extends Component {

  state = {
    posts: []
  };

  make_post(e) {

    e.preventDefault();

    let message = $(e.target).find('[name=message]')[0].value,
    token = this.props.token;

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
      //$(form).remove();
      console.info("/makepost : ", json)
    })
    .catch(error => {
      console.info("/makepost error : ", error)
    })


    /*
    fire.database().ref("posts").push({
      postedby: "afhlk8jIUm",
      text: message,
      created: new Date().getTime()
      //likes: {}
    }).then(res => {
      console.info(res)
    });
    */
    

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