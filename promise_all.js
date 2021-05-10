const Promise = require('promise')

function getName(){
    return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve("BOB")
            },5000)
    })
}


function getMobile(){
    return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve("9988776655")
            },3000)
    })
}


Promise.all([getName(),getMobile()]).then((result)=>{
    console.log(result)
})