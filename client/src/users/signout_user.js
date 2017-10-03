import React from "react";
import fire from "../config/fire";

const SignOut = (props) => {
  
  fire.auth().signOut();
  props.loggedout();

  return (
    <div>
      <h2>Logging out..</h2>
    </div>
  )  

}

export default SignOut;