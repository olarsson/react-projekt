import React, {Component} from 'react';
//import {store} from './index';
import fire from "../../config/fire";
import $ from 'jquery';
//import store from './store';


function deleteUser(e, that) {
  e.preventDefault();

  let btn = $(e.target).find('button')[0],
  form = e.target,
  delete_uid = $(btn).attr('data-uid'),
  token = that.props.token;
  //admin_email = that.props.email,
  //admin_password = that.props.password,

  btn.disabled = true;

  fetch("/admin_delete_user", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },    
    body: JSON.stringify({
      'delete_uid' : delete_uid,
      'token' : token
    })
  })
  .then(response => response.json())
  .then(json => {
    $(form).remove();
    console.info(json)
  });

}; 

class AdminUsers extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    let self = this;
    fire.database().ref("users").orderByChild("uid").once("value").then(function(snaps) {
      let x = [], i = 0;
      snaps.forEach(snapshot => {
        i++;
        x.push({
          uid: snapshot.val().uid,
          uid_users: snapshot.key,
          email: snapshot.val().email,
          role:  snapshot.val().role,
          key: i
        })
      });
      self.setState({users: x})
    });
  } 

  render() {
    let that = this;
    return this.props.logged_in ?
      <div>
        <h3>Logged in!</h3>
        <div className="usertable">
          <div className="theader">
            <div>Role</div>
            <div>Email</div>
            <div />
          </div>
          {this.state.users.map(function(user, i) {
            return <form key={i} onSubmit={(e, that) => deleteUser(e, this)}>
                <input type="hidden" readOnly value={user.uid_users} />
                <div>{user.role}</div>
                <div>{user.email}</div>
                <div>
                  <button type="submit" value="delete" data-uid={user.uid}>
                    Delete user
                  </button>
                </div>
              </form>;
          }, that)}
          <br />
        </div>
      </div>
      :
      <div>
        <h3>You need to log in!</h3>
      </div>
      ;
  }
}

export default AdminUsers;