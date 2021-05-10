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


async function getUser(){
    let name = await getName()
    console.log(name)
    let mobile = await getMobile()
    console.log(mobile)
}

getUser()