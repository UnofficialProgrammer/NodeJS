const Promise = require('promise')

function add(num1,num2){
    return new Promise((resolve,reject)=>{
        if(num1==10)
            reject("First Digit Is 10")
        else
            resolve(num1+num2)
    })
}


function multiply(num1,num2){
    return new Promise((resolve,reject)=>{
        if(num1<36)
            reject("First Digit Is Less than 36. Stop Proceeding")
        else
            resolve(num1*num2)
    })
}


function divide(num1,num2){
    return new Promise((resolve,reject)=>{
        if(num1==360)
            reject("First Digit Is 360. Stop Processing")
        else
            resolve(num1/num2)
    })
}


add(11,25).then((sum)=>{
    console.log(sum)
    return multiply(sum,10)
}).then((product)=>{
    console.log(product)
    return divide(product,10)
}).then((result)=>{
    console.log(result)
})
.catch((err)=>{
    console.log(err)
})