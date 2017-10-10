/*
export var createuser = function(req, res) {
  
  let ref = fire.database().ref('users'),
  //token = req.body.token,
  email = req.body.email,
  uid = req.body.uid,
  role;
    
  ref.once("value", function(snapshot) {

    role = (snapshot.numChildren() === 0 ? 'admin' : 'user');

    ref.push({
      email: email,
      uid: uid,
      role: role
    }).then(() => {
      res.json({
        'result':'success',
        'uid': uid,
        'role': role
      })
    }).catch((error) => {
      res.json({'result':'error', 'message':error})
    })

  })

}
*/


var express = require("express");
var router = express.Router();
//import fire from "../../client/src/config/fire";
import {fire, admin} from "../config";

router.post("/admin_create_user", function(req, res) {
  
  let ref = fire.database().ref('users'),
  //token = req.body.token,
  email = req.body.email,
  uid = req.body.uid,
  role;
    
  ref.once("value", function(snapshot) {

    role = (snapshot.numChildren() === 0 ? 'admin' : 'user');

    ref.push({
      email: email,
      uid: uid,
      role: role
    }).then(() => {
      res.json({
        'result':'success',
        'uid': uid,
        'role': role
      })
    }).catch((error) => {
      res.json({'result':'error', 'message':error})
    })

  })

});

module.exports = router;