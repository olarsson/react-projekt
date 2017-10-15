var express = require("express");
var router = express.Router();
import * as admin from "firebase-admin";
import fire from "../../client/src/config/fire";

//skapa kommentar
router.post("/board/make_comment", function(req, res) {
  
  let message = req.body.message,
  token = req.body.token,
  reference = req.body.reference;

  if (message.length < 1 || message.length > 1000) {
    
    res.json({'result':'error', 'message':'Your comment must be between between 1 to 1000 characters.'})

  } else {  

  admin.auth().verifyIdToken(token).then(function(decodedToken) {
    fire.database().ref("posts").push({
      postedby: decodedToken.uid,
      text: message,
      created: new Date().getTime(),
      reference: reference
    })
    .then(() => res.json({'result':'success'}))
    .catch((error) => { res.json({'result':'error', 'message':error.message}) }); 
  })
  .catch((error) => { res.json({'result':'error', 'message':error.message}) });

}

});

module.exports = router;