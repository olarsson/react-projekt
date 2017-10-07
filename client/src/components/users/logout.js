import React from "react";
import fire from "../../config/fire";

const LogOut = (props) => {
  
  fire.auth().signOut();
  props.loggedout();

  return (
    <div>
      <h2>Logged out.</h2>
    </div>
  )  

}

export default LogOut;