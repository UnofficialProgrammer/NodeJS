var express = require('express');
var router = express.Router();

var productHelpers = require('../helpers/product-helpers')
var userHelpers = require("../helpers/user-helpers");


//Middleware
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/userLogin')
  }
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  let user = req.session.user

  let cartCount = null

  if (user) {
    cartCount = await userHelpers.getCartCount(req.session.user._id)
  }


  /* >>>>>>GETTING PRODUCTS USING PROMISE METHOD<<<<<*/

  productHelpers.getProductsByPromise().then((products) => {
    res.render('user/index', { products, admin: false, user, cartCount });
  })

});



router.get('/userRegister', (req, res) => {
  res.render('user/user-register', { admin: false });
});


router.post('/userRegister', (req, res) => {
  userHelpers.registerUser(req.body).then((response) => {
    //res.render('user/user-register', { admin: false });

    //automatically redirect to LOGGED IN page with details
    req.session.loggedIn = true
    req.session.user = response
    res.redirect('/')
  })
});


router.get('/userLogin', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('user/user-login', { admin: false, loginError: req.session.loginError });
    req.session.loginError = false;
  }

});


router.post('/userLogin', (req, res) => {
  userHelpers.userLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginError = true
      res.redirect('/userLogin')
    }
  })
});


router.get('/userLogout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
});





router.get('/cart', verifyLogin, async (req, res) => {
  let user = req.session.user

  let cartCount = null

  if (user) {
    cartCount = await userHelpers.getCartCount(req.session.user._id)
  }



  let productsInCart = await productHelpers.getCartProducts(req.session.user._id)
  console.log(productsInCart)
  res.render('user/cart', { admin: false, user, productsInCart, cartCount });
});




router.get('/add-to-cart/:prodId', (req, res) => {

  //sending product_id and user_id
  userHelpers.addToCart(req.params.prodId, req.session.user._id).then((response) => {
    // res.redirect('/')
    res.json({ status: true })
  })

});


router.get('/remove_cart_item/:prodId', (req, res) => {

  //sending product_id and user_id
  userHelpers.removeCartItem(req.params.prodId, req.session.user._id).then((response) => {
    res.redirect('/cart')
    //res.json({ status: true })
  })

});


router.get('/update-cart/:prodId/:valueToChange', (req, res) => {

  //sending product_id and user_id
  userHelpers.updateCartItem(req.params.prodId, req.params.valueToChange, req.session.user._id).then((response) => {
    //res.redirect('/cart')
    res.json({ response })
  })

});


module.exports = router;
