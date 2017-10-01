import React, {Component} from 'react';
//import {store} from './index';
import fire from "./config/fire";
//import store from './store';

function deleteuser(e) {
  
  e.preventDefault();

  let uid = e.target.dataset.uid,
  pp = e.target.parentNode.parentNode,
  p = e.target.parentNode;

  e.target.disabled = true;

  fetch("/admin_delete", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },    
    body: JSON.stringify({
      'uid': uid
    })
  })
  .then(response => response.json())
  .then(json => {
    pp.removeChild(p);
  });

}

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
          key: i
        })
      });
      self.setState({users: x})
    });
  }

  render() {
    return (
      (this.props.logged_in ?
        <div>
          <h3>Logged in!</h3>
          <div>
          { this.state.users.map(function(user, i) {
            return (
              <form key={i}>
                Email: {user.email}
                <input type="hidden" readOnly value={user.uid} />
                <input type="hidden" readOnly value={user.uid_users} />
                <button onClick={deleteuser} type="submit" value="delete" data-uid={user.uid}>Delete user</button>
              </form>
              )
            }
            )}
            <br/>
          </div>
        </div>
        :
        <div>
          <h3>You need to log in!</h3>
        </div>
      )
    )
  }
}

export default AdminUsers;