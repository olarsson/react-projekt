import React from "react";
import { Link } from 'react-router-dom';

const Header = (props) => {
  console.info('header props ',props)
  return (
    <header>
      <p>Header</p>
      <p>{props.logged_in ? `Logged in as: ${props.email}` : 'Not logged in.'}</p>
      <Link to="/">Home</Link>&nbsp;
      <Link to="/signin">Sign in</Link>&nbsp;
      <Link to="/admin">Admin</Link>&nbsp;
      <hr/>
    </header>
  );
}

export default Header;