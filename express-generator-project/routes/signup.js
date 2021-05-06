var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  res.send('Data Submitted')
});

module.exports = router;
