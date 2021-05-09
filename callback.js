//display an error message if the first digit is 0 while adding
function add(num1,num2,callback){
    let err = false
    if(num1==0)
    err = true
    callback(num1+num2,err)
}

function multiply(num1,num2,callback){
    callback(num1*num2)
}


function divide(num1,num2,callback){
    callback(num1/num2)
}


add(15,20,(sum,err)=>{
    if(err)
    console.log('Error as the first digit is zero')
    else{
        console.log(sum)
        multiply(sum,100,(product)=>{
            console.log(product)
            divide(product,10,(result)=>{
                console.log(result)
            })
        })
    }
   

})