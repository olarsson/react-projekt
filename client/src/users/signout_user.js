import React from "react";
import fire from "../config/fire";

const SignOut = () => {
  fire.auth().signOut();
  return <div>Signed out</div>
}

export default SignOut;