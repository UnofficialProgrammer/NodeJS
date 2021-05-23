var database = require('../config/connection');

const bcrypt = require('bcrypt');

var objectId = require('mongodb').ObjectId

module.exports = {
    registerUser: (userData) => {
        return new Promise(async (resolve, reject) => {
            //hashing password
            userData.password = await bcrypt.hash(userData.password, 10)
            database.get().collection('users').insertOne(userData).then((data) => {
                resolve(data.ops[0])
            })
        })
    },

    userLogin: (userData) => {

        return new Promise(async (resolve, reject) => {
            let user = await database.get().collection('users').findOne({ email: userData.email })
            let response = {}
            if (user) {
                let status = await bcrypt.compare(userData.password, user.password)
                if (status) {
                    response.user = user
                    response.status = true
                    resolve(response)
                } else {
                    resolve({ status: false })
                }
            } else {
                resolve({ status: false })
            }
        })
    },

    addToCart: (prodId, userId) => {
        let prodObj = {
            item: objectId(prodId),
            quantity: 1
        }
        return new Promise(async (resolve, reject) => {
            //check whether the user is already present in cart
            let userCart = await database.get().collection('cart').findOne({ user: objectId(userId) })
            if (userCart) {

                //check whether the same product is already present in cart. if present update the quantity of the product

                //this will return the index of the finding element. -1 means product not present
                let prodExist = userCart.products.findIndex(product => product.item == prodId)

                if (prodExist != -1) {
                    database.get().collection('cart').updateOne({ 'products.item': objectId(prodId), user: objectId(userId) },
                        {
                            $inc: { 'products.$.quantity': 1 }
                        }).then(() => {
                            resolve()
                        })
                }
                else {
                    database.get().collection('cart')
                        .updateOne({ user: objectId(userId) }, {
                            $push: {
                                products: prodObj
                            }
                        }).then((response) => {
                            resolve()
                        })
                }
            } else {
                //insert data as object in cart collection. adding both product id and quatity
                let cartObj = {
                    user: objectId(userId),
                    products: [prodObj]
                }

                database.get().collection('cart').insertOne(cartObj).then(() => {
                    resolve()
                })
            }
        })
    },

    getCartCount: (userId) => {
        return new Promise(async (resolve, reject) => {

            let productsInCartCount = 0

            //check whether the user is already present in cart
            let userCart = await database.get().collection('cart').findOne({ user: objectId(userId) })
            if (userCart) {

                let productsInCart = await database.get().collection('cart')
                    .aggregate([
                        {
                            $match:
                            {
                                user: objectId(userId)
                            }
                        },
                        {
                            $project:
                            {
                                totalProductsInCart: { $sum: "$products.quantity" }
                            }
                        }
                    ]).toArray()

                if (productsInCart) {
                    productsInCartCount = productsInCart[0].totalProductsInCart
                    resolve(productsInCartCount)
                }
            }
            else {
                resolve(productsInCartCount)
            }
            /*
                        let count = 0
                        let cartCount = await database.get().collection('cart').findOne({ user: objectId(userId) })
                        if (cartCount) {
                            count = cartCount.products.length
                        }
                        resolve(count)
            */
        })
    },

    removeCartItem: (prodId, userId) => {
        return new Promise(async (resolve, reject) => {
            let userCart = await database.get().collection('cart').findOne({ user: objectId(userId) })
            if (userCart) {
                //this will return the index of the finding element. -1 means product not present
                let prodExist = userCart.products.findIndex(product => product.item == prodId)

                if (prodExist != -1) {
                    database.get().collection('cart').updateOne({ user: objectId(userId) },
                        {
                            $pull: { products: {item: objectId(prodId)}}
                        }).then(() => {
                            resolve()
                        })
                }
            }
        })
    },

    updateCartItem: (prodId, valueToChange, userId, currentQuantity)=> {
        return new Promise(async (resolve,reject)=>{
            let userCart = await database.get().collection('cart').findOne({ user: objectId(userId) })


            if (userCart) {

                //this will return the index of the finding element. -1 means product not present
                let prodExist = userCart.products.findIndex(product => product.item == prodId)

                if (prodExist != -1) {
                    if(valueToChange == -1 && currentQuantity == 1){
                        database.get().collection('cart').updateOne({ user: objectId(userId) },
                        {
                            $pull: { products: {item: objectId(prodId)}}
                        }).then(() => {
                            resolve(1)
                        })
                    }else{
                        database.get().collection('cart').updateOne({ 'products.item': objectId(prodId), user: objectId(userId) },
                        {
                            $inc: { 'products.$.quantity': parseInt(valueToChange) }
                        }).then(() => {
                            resolve(0)
                        })
                    }
                    
                }
            }


        })
    },

    updateCartItemNBB: (prodId, valueToChange, userId)=> {
        return new Promise(async (resolve,reject)=>{
            let userCart = await database.get().collection('cart').findOne({ user: objectId(userId) })


            if (userCart) {

                //this will return the index of the finding element. -1 means product not present
                let prodExist = userCart.products.findIndex(product => product.item == prodId)

                if (prodExist != -1) {
                    database.get().collection('cart').updateOne({ 'products.item': objectId(prodId), user: objectId(userId) },
                        {
                            $inc: { 'products.$.quantity': parseInt(valueToChange) }
                        }).then(() => {
                            resolve()
                        })
                }
            }


        })
    }
}