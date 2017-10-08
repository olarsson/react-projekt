import React, { Component } from "react";
import fire from "../../config/fire";

class LogOut extends Component {

  state = {
    done: false
  }
  
  componentDidMount() {
    let that = this;
    fire.auth().signOut().then(function() {
      that.props.loggedout();
      that.setState({done: true})
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.done ? 'Logged out' : 'Logging out..'}</h2>
      </div>
    )
  }
}

export default LogOut;
