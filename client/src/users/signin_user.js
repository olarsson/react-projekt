import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from "../config/fire";

/*
class SignIn extends Component {

  state = {
    email: 'aa@aa.com',
    password: 'passaa',
    status_msg: null
  };

  
  signin_user(e) {

    e.preventDefault();

    let email = this.state.email,
    password = this.state.password,
    that = this;

    fire.auth().signInWithEmailAndPassword(email, password).then(user => {
      that.setState({status_msg: null});
      this.props.loggedin();
    })
    .catch(function(error) {
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
    return(
      <div>
        <h3>Sign in</h3>
        { (this.state.status_msg !== null ? 'Error: ' + this.state.status_msg : '') }
        <form onSubmit={this.signin_user.bind(this)}>
          <input type="text" name="email" placeholder={this.state.email} onChange={this.handleEmailChange.bind(this)} /><br/>
          <input type="password" name="password" placeholder={this.state.password} onChange={this.handlePasswordChange.bind(this)}/><br/>
          <input type="submit" />
        </form>
      </div>
    )
  }

}*/
/*

const SignIn = (props) => {

  console.info('signin props: ', props)

  return (
    <div>
      <h3>Logged in</h3>
    </div>
  );
}
*/

class SignIn extends Component {
  upd() {
    this.props.changemsg();
    //console.info('signin props: ', this.props.loggedin)
    //console.info(this.props.loggedin)
  }

  render() {
    return (
      <div>
        <h3>Logged in</h3>
        <button onClick={this.upd.bind(this)}>testchild > reflect state</button>
      </div>
    );
  }
}


// connect application state to props
function mapStateToProps(state) {
  return { loggedin: state.loggedin };
}

export default connect(mapStateToProps)(SignIn);

//export default SignIn;