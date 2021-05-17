var express = require('express');
var router = express.Router();

//including the helper file
var productHelpers = require("../helpers/product-helpers");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Express', admin:true });
});


router.get('/view-products', function(req, res, next) {
  //res.send('Front End');
  res.render('admin/view-products', { title: 'Express', admin:true });
});

router.get('/add-product', function(req, res, next) {
  //res.send('Front End');
  res.render('admin/add-product', { title: 'Express', admin:true });
});


router.post("/add-product", function (req, res) {
  productHelpers.addProduct(req.body, (result) => {
    let image = req.files.image;
    
    //for getting the extension
    let uploadedFIle = image.name;
    let fileExtension = uploadedFIle.split(".").pop();

    image.mv("./public/product-images/" + result +"."+fileExtension, (err, done) => {
      if (!err) {
        res.render("admin/add-product", { admin: true });
      } else {
        console.log(err);
      }
    });
  });
});

module.exports = router;
