import React, { Component } from "react";
import fire from "../../config/fire";

class CreateUser extends Component {

  state = {
    email: "aa@aa.com",
    password: "passaa",
    role: "user",
    uid: null,
    status_msg: null
  };

  create_account(e) {

    e.preventDefault();

    var that = this,
    email = this.state.email,
    password = this.state.password;
    
    fire.auth().createUserWithEmailAndPassword(email, password).then(user => {
      
      fetch("/admin_create_user", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          uid: user.uid
        })
      })
      .then(response => response.json())
      .then(json => {

        if (json.result === "success") {
          fire.auth().currentUser.getIdToken(true).then(function(idToken) {
            that.props.signup_success(json.uid, email, json.role, idToken);
          }).catch(function(error) {
            that.setState({status_msg: error});
          });
        } else {
          that.setState({status_msg: json.message});
        }
        
        //that.setState({status_msg: (json.result === "success" ? null : json.message)})

      });
      
    }).catch(function(error) {
      that.setState({status_msg: error.message});
    });

  }
 
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    return this.props.logged_in
    ?
      <div>
        <h3>Welcome, your account was successfully created.</h3>
      </div>
    :
      <div>
        <h3>Create account</h3>
        { (this.state.status_msg !== null ? 'Error: ' + this.state.status_msg : '') }
        <form onSubmit={this.create_account.bind(this)}>
          <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} /><br/>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/><br/>
          <input type="submit" />
        </form>
      </div>
    ;
  }
}

export default CreateUser;