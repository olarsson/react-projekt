import React from "react";
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <p>Header</p>
      <p>{props.logged_in ? `Logged in as "${props.role} / ${props.email}"` : 'Not logged in.'}</p>
      <ul>
        {!props.logged_in ? '' : <li><Link to="/posts">Posts</Link></li> }
        {props.logged_in && props.role === 'admin' ? <li><Link to="/blog">Blog</Link></li> : '' }
        {props.logged_in ? '' : <li><Link to="/create">Create account</Link></li> }
        {props.logged_in ? '' : <li><Link to="/">Login</Link></li> }
        {!props.logged_in ? '' : <li><Link to="/logout">Log out</Link></li> }
        {props.logged_in && props.role === 'admin' ? <li><Link to="/admin">Admin</Link></li> : '' }
      </ul>
      <hr/>
    </header>
  );
}

export default Header;