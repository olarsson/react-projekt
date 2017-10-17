import React, {Component} from 'react';
import $ from 'jquery';

function getUserList(that) {

  if (that.props.token) {
    fetch("/admin/userlist", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: that.props.token
      })
    })
    .then(response => response.json())
    .then(json => {
      if (json.result === "success") {
        that.setState({
          error: null,
          users: json.users
        })
      } else {
        that.setState({error: json.message})
      }
    }).catch(error => {
      that.setState({error: error.message})
    })
  }

}

function deleteUser(e, that) {
  e.preventDefault();

  let btn = $(e.target).find('button')[0],
  form = e.target,
  delete_uid = $(btn).attr('data-uid'),
  token = that.props.token;

  if (!btn.disabled) {
    btn.disabled = true;
    fetch("/admin/delete/user", {
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
    });
  }

}; 

class AdminUsers extends Component {

  state = {
    users: [],
    error: null,
  }

  componentDidMount() {
    getUserList(this)
  }

  render() {
    let that = this;
    return this.props.logged_in ?
      <div className="main">
        <h3>Manage users</h3>

        {this.state.error === null ? 

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
                  {user.role === 'user' ? 
                  <button type="submit" value="delete" data-uid={user.uid}>
                    Delete user
                  </button>
                  : ''}
                </div>
              </form>;
          }, that)}
          <br />
        </div>

        : 
        
        <p>Error: {this.state.error}</p>
        
        } 

      </div>
      :
      <div className="main">
        <h3>You need to log in!</h3>
      </div>
      ;
  }
}

export default AdminUsers;