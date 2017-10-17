import React from "react";
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <h1>Messageboard expirement</h1>
      <p>{props.logged_in ? `Logged in as "${props.role} / ${props.email}"` : 'Not logged in.'}</p>
      <ul>
        {!props.logged_in ? '' : <li><Link to="/board">Messageboard</Link></li> }
        {props.logged_in && props.role === 'admin' ? <li><Link to="/topics">Manage topics</Link></li> : '' }
        {props.logged_in ? '' : <li><Link to="/create">Create account</Link></li> }
        {props.logged_in ? '' : <li><Link to="/">Login</Link></li> }
        {!props.logged_in ? '' : <li><Link to="/logout">Log out</Link></li> }
        {props.logged_in && props.role === 'admin' ? <li><Link to="/admin">User admin</Link></li> : '' }
      </ul>
    </header>
  );
}

export default Header;