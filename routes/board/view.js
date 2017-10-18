var express = require("express");
var router = express.Router();
var admin = require('firebase-admin');
//import * as admin from "firebase-admin";
var fire = require('../../react-ui/src/config/fire');
//import fire from "../../react-ui/src/config/fire";

//hämta alla topics och kommentarer
router.post("/board/view", function(req, res) {
  
  let x = [], x2 = [], i, users = [];

  let uidToEmail = function(uid) {
    let email = null;
    users.forEach(item => {
      if (item.uid === uid) email = item.email;
    })
    return email;
  }
  
  fire.database().ref("topics").orderByChild("created").once("value").then(function(snaps) {


    fire.database().ref("users").orderByChild("uid").once("value").then(function(snaps) {
      
      i = 0;
      snaps.forEach(snapshot => {
        i++;
        users.push({
          uid: snapshot.val().uid,
          email: snapshot.val().email,
          key: i
        });
      });

    }).then(() => {

      i = 0;
      snaps.forEach(snapshot => {
        i++;
        x.push({
          id: snapshot.key,
          email: uidToEmail(snapshot.val().postedby),
          postedby: snapshot.val().postedby,
          created: Date(snapshot.val().created), 
          text: snapshot.val().text,
          key: i
        });
      });
  
      fire.database().ref("posts").orderByChild("created").once("value").then(function(snaps) {
        i = 0;
        snaps.forEach(snapshot => {
          i++;
          x2.push({
            id: snapshot.key,
            email: uidToEmail(snapshot.val().postedby),
            postedby: snapshot.val().postedby,
            created: Date(snapshot.val().created),
            text: snapshot.val().text,
            reference: snapshot.val().reference,
            key: i
          });
        });
  
        res.json({
          'result': 'success',
          'topics': x,
          'posts': x2
        })
  
      })
      .catch((error) => { res.json({'result':'error', 'message':error.message}) });




    })



  })
  .catch((error) => { res.json({'result':'error', 'message':error.message}) });

});


module.exports = router;