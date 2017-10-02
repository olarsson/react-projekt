import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <p>Header</p>
      <Link to="/">Home</Link>&nbsp;
      <Link to="/signin">Sign in</Link>&nbsp;
      <Link to="/admin">Admin</Link>&nbsp;
      <hr/>
    </header>
  );
}

export default Header;