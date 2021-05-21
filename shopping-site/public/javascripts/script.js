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
    



    $.ajax({
        url:'/update-cart/'+prodId+'/'+value,
        method:'get',
        success:(response)=>{
            let count=$('#cart-count').html()
            count = parseInt(count)+parseInt(value)
            $('#cart-count').html(count)
        
            let rowIndexValue    =   $('#rowIndex'+rowIndex).html()
            rowIndexValue = parseInt(rowIndexValue) + parseInt(value)
            $('#rowIndex'+rowIndex).html(rowIndexValue)
        }
    })
}