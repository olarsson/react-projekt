import React, { Component } from "react";
import fire from "../../config/fire";

class CreateUser extends Component {

  state = {
    email: "aa@aa.com",
    password: "passaa",
    role: "admin",
    uid: null,
    status_msg: null
  };

  create_account(e) {

    e.preventDefault();

    var that = this,
    email = this.state.email,
    password = this.state.password,
    role = this.state.role;

    fire.auth().createUserWithEmailAndPassword(email, password).then(user => {
      fire.database().ref("users").push({
        email: email,
        uid: user.uid,
        role: role
      }).then(() => {
        fire.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          that.props.signup_success(user.uid, email, role, idToken);
        }).catch(function(error) {
          that.setState({status_msg: error});
        });
      }).catch((error) => {
        that.setState({status_msg: error});
      })
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

  handleRoleChange(e) {
    this.setState({role: e.target.value});
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
          <select name="role" onChange={this.handleRoleChange.bind(this)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>          
          <input type="submit" />
        </form>
      </div>
    ;
  }
}

export default CreateUser;