const mongoClient = require('mongodb').MongoClient;

const state = {
    db:null
}
module.exports.connect = function(callback){
    const url = 'mongodb://localhost:27017'
    const dbname = 'shopping-cart'

    mongoClient.connect(url,{useUnifiedTopology: true},(err,client)=>{
        if(err) return callback(err)
        state.db = client.db(dbname)
        callback() //calling fuction callback without passing any error params since no errors
    })

    
}

module.exports.get = function(){
    return state.db
}