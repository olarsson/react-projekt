import React from "react";
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <p>Header</p>
      <p>{props.logged_in ? `Logged in as: ${props.email}` : 'Not logged in.'}</p>
      <ul>
        <li><Link to="/">Home</Link></li>
        {props.logged_in ? '' : <li><Link to="/create">Create account</Link></li> }
        {props.logged_in ? '' : <li><Link to="/signin">Sign in</Link></li> }
        {!props.logged_in ? '' : <li><Link to="/signout">Sign out</Link></li> }
        <li><Link to="/admin">Admin</Link></li>
      </ul>
      <hr/>
    </header>
  );
}

export default Header;