var express = require('express');
var router = express.Router();

// Retrieves Home Page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Barrie Business' });
});

module.exports = router;
