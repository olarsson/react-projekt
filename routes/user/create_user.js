var express = require("express");
var router = express.Router();
import * as admin from "firebase-admin";
import fire from "../../client/src/config/fire";

//skapa ny användare
router.post("/admin_create_user", function(req, res) {
  
  let ref = fire.database().ref('users'),
  email = req.body.email,
  uid = req.body.uid,
  role;
    
  ref.once("value", function(snapshot) {
    role = (snapshot.numChildren() === 0 ? 'admin' : 'user');
    ref.push({
      email: email,
      uid: uid,
      role: role
    })
    .then(() => {
      res.json({
        'result':'success',
        'uid': uid,
        'role': role
      })
    })
    .catch((error) => { res.json({'result':'error', 'message':error.message}) })
  })

});

module.exports = router;