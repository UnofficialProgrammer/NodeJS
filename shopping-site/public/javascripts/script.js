function addToCart(prodId){
    $.ajax({
        url:'/add-to-cart/'+prodId,
        method:'get',
        success:(response)=>{
            if(response.status){
                let count=$('#cart-count').html()
                count = parseInt(count)+1
                $('#cart-count').html(count)
            }
        }
    })
}

function updateCart(value,rowIndex,prodId){
    var currentQuantity = document.getElementById("rowIndex"+rowIndex).innerHTML
    $.ajax({
        url:'/update-cart/'+prodId+'/'+value+'/'+currentQuantity,
        method:'get',
        success:(response)=>{
            console.log(response)
            if(response.response==1){
                alert("Product Removed From Cart")
                location.reload()  
            }else {
                let count=$('#cart-count').html()
                count = parseInt(count)+parseInt(value)
                $('#cart-count').html(count)
            
                let rowIndexValue    =   $('#rowIndex'+rowIndex).html()
                rowIndexValue = parseInt(rowIndexValue) + parseInt(value)
                $('#rowIndex'+rowIndex).html(rowIndexValue)

                $('#cart-amount').html(response.total)
            }

        }
    })
}