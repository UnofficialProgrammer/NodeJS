var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

router.post('/', function(req, res, next) {
  console.log(req.body)
  MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, function(err,client){
    if(err)
      console.log('Error Occured')
    else{
      console.log('Connected To DB')
      client.db('sandeep').collection('signup').insertOne(req.body) 
    }  
  })
  res.send('Data Submitted')
});

module.exports = router;
