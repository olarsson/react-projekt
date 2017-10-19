import React, { Component } from 'react';
import fire from "../../config/fire";

class LoginUser extends Component {

  componentWillReceiveProps(newprops) {
    if (newprops.logged_in === true) this.setState({logged_in: true})
  }

  state = {
    email: "",
    password: "",
    role: "user",    
    status_msg: null,
    logged_in: false
  };

  signin_user(e) {

    this.setState({status_msg: null})

    e.preventDefault();

    let email = this.state.email,
    password = this.state.password,
    btn = document.querySelector('.main input[type="submit"]'),
    that = this;

    if (!btn.disabled) {

      btn.disabled = true;

      fire.auth().signInWithEmailAndPassword(email, password).then(user => {
        fire.database().ref("users").orderByChild("uid").equalTo(user.uid).once("value").then(function(snaps) {
          snaps.forEach(snapshot => {
            fire.auth().currentUser.getIdToken(true).then(function(idToken) {
              that.props.loggedin({
                uid: user.uid,
                email: user.email,
                role: snapshot.val().role,
                token: idToken
              });
              btn.disabled = false;
            }).catch(function(error) {
              btn.disabled = false;
              that.setState({status_msg: error.message});
            });         
          });
        }).catch(function(error) {
          btn.disabled = false;
          that.setState({status_msg: error.message});
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
        <h3>Hello! You're logged in.</h3>
      </div>
    : 
      <div className="main">
        <h3>Login</h3>
        { (this.state.status_msg !== null ? 'Error: ' + this.state.status_msg : '') }
        <form onSubmit={this.signin_user.bind(this)}>
          <input type="text" name="email" placeholder="Email" onChange={this.handleEmailChange.bind(this)} /><br/>
          <input type="password" name="password" placeholder="Password" onChange={this.handlePasswordChange.bind(this)}/><br/>
          <input type="submit" />
        </form>
      </div>
    ;

  }

}

export default LoginUser;