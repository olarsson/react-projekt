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

  changeRole(e, uid, that) {

    let token = that.props.token;
  
    if (!$('select').attr('disabled')) {
      
      $('select').attr('disabled', 'disabled');

      fetch("/admin/change/role", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },    
        body: JSON.stringify({
          'change_uid' : uid,
          'token' : token,
          'role' : e.target.value
        })
      })
      .then(response => response.json())
      .then(json => {
        $('select').removeAttr('disabled');
      }).catch((err) => {
        $('select').removeAttr('disabled');
      })
    }

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
          </div>
          {this.state.users.map(function(user, i) {
            return <div className="row" key={i}>
                <div>
                  <select onChange={(e, uid, that) => this.changeRole(e, user.uid, this)}>
                    {(user.role === 'user' ? <option defaultValue="user">user</option> : <option defaultValue="admin">admin</option>)}
                    {(user.role === 'admin' ? <option defaultValue="user">user</option> : <option defaultValue="admin">admin</option>)}
                  </select>                  
                </div>
                <div>{user.email}</div>
                <div>
                  <form onSubmit={(e, that) => deleteUser(e, this)}>
                    <input type="hidden" readOnly value={user.uid_users} />
                    <button type="submit" value="delete" data-uid={user.uid}>Delete user</button>
                  </form>
                </div>
              </div>;
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