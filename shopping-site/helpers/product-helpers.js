//const { Db } = require('mongodb');
var database = require('../config/connection');

var objectId = require('mongodb').ObjectId

module.exports = {
    addProduct:(product,callback)=>{
        database.get().collection('product').insertOne(product).then((data)=>{
            callback(data.ops[0]._id)
        })
    },

    getProducts:(callback)=>{
        database.get().collection('product').find().toArray((error, data)=>{
            callback(data)
        })
    },

    getProductsByPromise:()=>{
        return new Promise(async(resolve,reject)=>{
            let products = await database.get().collection('product').find().toArray()
            resolve(products)
        })
    },

    deleteProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            database.get().collection('product').removeOne({_id:objectId(prodId)}).then((response)=>{
                resolve(response)
            })
        })
    },

    editProduct:(prodId)=>{
        return new Promise((resolve,reject)=>{
            database.get().collection('product').findOne({_id:objectId(prodId)}).then((response)=>{
                resolve(response)
            })
        })
    },

    updateProduct:(prodId,product)=>{
        return new Promise((resolve,reject)=>{
            database.get().collection('product')
            .updateOne({_id:objectId(prodId)},{
                $set:{
                    Name:product.Name,
                    Description:product.Description
                }
            }).then((response)=>{
                resolve(response)
            })
        })
    },

   /* getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems = await database.get().collection('cart').aggregate([
                {
                    $match:{user:objectId(userId)}
                },
                {
                    $lookup:{
                        from:'product', //table name
                        let:{prodList:'$products'}, //field name
                        pipeline:[
                            {
                                $match:{
                                    $expr:{
                                        $in:['$_id',"$$prodList"]
                                    }
                                }
                            }
                        ],
                        as:"cartItems"
                    }
                }
            ]).toArray()

            resolve(cartItems[0].cartItems)
        })
    },
*/

getCartProducts:(userId)=>{
    return new Promise(async(resolve,reject)=>{
        let cartItems = await database.get().collection('cart').aggregate(
            [
                {
                    $match:{user:objectId(userId)}
                },
                {
                    $unwind:"$products"
                },
                {
                    $project:{item:'$products.item', quantity:'$products.quantity'}
                },
                {
                    $lookup:{
                        from:'product',
                        localField:'item',
                        foreignField:'_id',
                        as:'products'
                    }
                }
            ]).toArray()

        resolve(cartItems)
    })
},

}