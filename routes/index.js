require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    console.log(name)
    console.log(file)
    exports[name] = require('./' + file);
  }
});

/*
var express = require("express");
var router = express.Router();

import * as admin from "firebase-admin";

var serviceAccount = require("../project-test-4585e73d8343.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});


app.use(require('./routes/admin/delete_user.js'));
app.use(require('./routes/admin/delete_comment.js'));
app.use(require('./routes/admin/delete_blog_and_comments.js'));
app.use(require('./routes/admin/make_blog_post.js'));
app.use(require('./routes/user/create_user.js'));
app.use(require('./routes/user/make_post.js'));

module.exports = router;
*/