var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page (which displays tasks). */
router.get('/', function(req, res, next) {
  res.redirect('/tasks');
});

module.exports = router;