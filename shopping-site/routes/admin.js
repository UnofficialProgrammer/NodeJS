var express = require('express');
var router = express.Router();

//including the helper file
var productHelpers = require("../helpers/product-helpers");

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getProductsByPromise().then((products)=>{
    res.render("admin/index", { products, admin: true });
  })
});


router.get('/view-products', function(req, res, next) {
  res.render('admin/view-products', { title: 'Express', admin:true });
});

router.get('/add-product', function(req, res, next) {
  res.render('admin/add-product', { title: 'Express', admin:true });
});


router.post("/add-product", function (req, res) {
  productHelpers.addProduct(req.body, (result) => {
    let image = req.files.Image;
    
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



router.get("/deleteProduct/:id", function (req, res) {
  let prodId = req.params.id
  productHelpers.deleteProduct(prodId).then((response)=>{
    res.redirect('/admin')
  })
});

router.get("/editProduct/:id", function (req, res) {
  let prodId = req.params.id
  productHelpers.editProduct(prodId).then((product)=>{
    res.render('admin/edit-product',{admin:true, product})
  })
});


router.post("/editProduct/:id", function (req, res) {
  let prodId = req.params.id
  productHelpers.updateProduct(prodId,req.body).then((response)=>{

    //req.session.productUpdated  = "Product Updated"
    //res.redirect('/admin')

    if(req.files){
      let image = req.files.Image

      //for getting the extension
      let uploadedFIle = image.name;
      let fileExtension = uploadedFIle.split(".").pop();

      image.mv("./public/product-images/" + prodId +"."+fileExtension)

    }
    res.redirect('/admin')
  })
});

module.exports = router;
