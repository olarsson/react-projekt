import React, { Component } from "react";
import fire from "../../config/fire";
import $ from 'jquery';

class CreateUser extends Component {

  state = {
    email: "",
    password: "",
    role: "user",
    uid: null,
    status_msg: null
  };

  create_account(e) {

    e.preventDefault();

    var that = this,
    email = this.state.email,
    password = this.state.password,
    btn = $(e.target).find('input[type="submit"]')[0];

    if (!btn.disabled) {

      btn.disabled = true;

      this.setState({status_msg: null});

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
              that.props.signup_success({
                uid: json.uid,
                email: email,
                role: json.role,
                token: idToken
              });
              btn.disabled = false;
            }).catch(function(error) {
              btn.disabled = false;
              that.setState({status_msg: error});
            });
          } else {
            btn.disabled = false;
            that.setState({status_msg: json.message});
          }

        });
        
      }).catch(function(error) {
        btn.disabled = false;
        that.setState({status_msg: error.message});
      });


    }



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
      <div className="main">
        <h3>Welcome, your account was successfully created.</h3>
      </div>
    :
      <div className="main">
        <h3>Create account</h3>
        <form onSubmit={this.create_account.bind(this)}>
          <input type="text" name="email" placeholder="Email" onChange={this.handleEmailChange.bind(this)} /><br/>
          <input type="password" name="password" placeholder="Password" onChange={this.handlePasswordChange.bind(this)}/><br/>
          <input type="submit" />
        </form>
        { (this.state.status_msg !== null ? <div className="formerror"><span>Error</span><span>{this.state.status_msg}</span></div> : '') }
      </div>
    ;
  }
}

export default CreateUser;