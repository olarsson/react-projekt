import React, { Component } from "react";
import fire from "../config/fire";

class CreateUser extends Component {

  state = {
    email: 'aa@aa.com',
    password: 'passaa',
    uid: null
  };

  create_account(e) {

    e.preventDefault();

    var email = this.state.email,
    password = this.state.password;

    fire.auth().createUserWithEmailAndPassword(email, password).then(user => {
      //Sign up - success
      fire.database().ref("users").push({
        email: email,
        uid: user.uid
      }).then(() => {
        //res.json({'result': 'signup success'})
      }).catch(() => {
        //res.json({'result': 'signup error'})
      })
    })
    .catch(function(error) {
      //res.json({'result': 'signup error cuwep - ' + error.message})
    });

  }
 
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    return (
      <div>
        <h3>Create account</h3>
        <form onSubmit={this.create_account.bind(this)}>
          <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} /><br/>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/><br/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateUser;


    //Check if email exists
/*
    this.state.users.orderByChild('email').equalTo(email).once('value').then(function(snaps) {

      if (snaps.val() !== null) {
        console.log('nope, exists')
      } else {

        var usersCallback = fire.database().ref("users").push({
          email: email,
          password: password
        });

        console.log(usersCallback.key)

      }
    });*/
