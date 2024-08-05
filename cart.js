let cartData= JSON.parse(localStorage.getItem('cart'))
cartData.forEach((elem)=>{
    showCartData(elem)
})
displayBill(cartData)

// showCartData()
function showCartData(elem){
    document.querySelector('.nav-cart-counter').innerText= cartData.length;
    let leftContainer= document.getElementById('cart-left-container');
    cartEmpty()

    let eachCartItem= document.createElement('div');
    eachCartItem.className= 'each-cart-items';

    let cartImg= document.createElement('img');
    cartImg.className= 'each-cart-img';
    cartImg.src= elem.img;

    let middleContainer= document.createElement('div');
    middleContainer.className= 'each-cart-middle-container';
    middleContainer.innerHTML= `<p class="each-cart-name">${elem.name}</p>
    <h3 style="font-size: 1.3rem;">MRP ₹${elem.newPrice}</h3>
    `;

    let eachCartRightContainer= document.createElement('div');
    eachCartRightContainer.className= 'each-cart-right-container';

    // let deleteCartBtn= document.createElement('img');
    let deleteCartBtn= document.createElement('button');
    deleteCartBtn.innerText= "Remove"
    deleteCartBtn.className= 'each-cart-delete-icon';
    deleteCartBtn.src= 'https://cdn-icons-png.flaticon.com/512/1345/1345874.png'

    let selectQty= document.createElement('select');
    selectQty.className= 'each-cart-qty-select'
    selectQty.innerHTML= `<select class="each-cart-qty-select">
    <option value="${elem.quantity}" selected>${elem.quantity}</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
</select>`

eachCartRightContainer.append(deleteCartBtn, selectQty)
    eachCartItem.append(cartImg, middleContainer, eachCartRightContainer)
    leftContainer.append(eachCartItem)

    deleteCartBtn.addEventListener('click', ()=>{
        eachCartItem.remove();
        // countCart.innerHTML= cartData.length;
        cartEmpty()
        cartData = cartData.filter((item) => item.id !== elem.id);
        displayBill(cartData)
        localStorage.setItem('cart', JSON.stringify(cartData))
        showCartData()

        
    })

    selectQty.addEventListener('change', (e)=>{
    //    let qty= document.querySelector('.each-cart-qty-select') ;
       let qty= e.target.value;
       updateQty = cartData.map((item)=>{
        if(item.id == elem.id){
            return {...item, quantity: Number(qty)};
        }
        return item;
       })
       displayBill(updateQty);
       localStorage.setItem('cart', JSON.stringify(updateQty));
       showCartData()
    
    })
}

function cartEmpty(){
    let leftContainer= document.getElementById('cart-left-container');
    let countCart= document.querySelector('.cart-item-count');
    if(cartData.length<=0){
       countCart.innerHTML= 0;
    
       let cartEmptyContainer= document.createElement('div');
       cartEmptyContainer.className= 'cart-empty-container';
    
       let emptyImg= document.createElement('img');
       emptyImg.src= 'https://assets.pharmeasy.in/web-assets/images/emptyCart.png?dim=96x96&q=75'
       emptyImg.className= 'empty-img'
    
       let emptyPara= document.createElement('p'); 
       emptyPara.innerText= 'Your Medicine/Healthcare cart is empty!';
       emptyPara.className= 'empty-para'
    
       cartEmptyContainer.append(emptyImg, emptyPara);
       leftContainer.append(cartEmptyContainer);
    
    }else{
       countCart.innerHTML= cartData.length;
    }
}
cartEmpty()

// ---------------------------Cart Right-----------------------------

function displayBill(data){
    let total=0;
   data.forEach((item)=>{
    let eachSum= item.newPrice * item.quantity;
    total+= eachSum
   })
//    console.log(total)

   document.querySelector('.bill-total-amount1').innerText= `₹ ${parseFloat(total.toFixed(2))}`
   

}

// ----------------------------------show address form in slide------------------------------------------------
document.querySelector('.add-address-btn').addEventListener('click', ()=>{
    document.getElementById('address-container').className= 'show-address-container';
    document.querySelector('.show-address-container').innerHTML='';
    let afterClicked= document.querySelector('.show-address-container');

    
    let addressForm= document.createElement('form');
    addressForm.className= 'address-form'

    let addressInput= document.createElement('input');
    addressInput.className= 'address-input'
    addressInput.placeholder= 'Enter location'

    let addressBtn= document.createElement('input');
    addressBtn.type= 'submit';
    addressBtn.className= 'address-btn'

    let closeAddress= document.createElement('img');
    closeAddress.src= 'https://cdn-icons-png.flaticon.com/512/7269/7269138.png'
    closeAddress.className= 'close-address'

    addressForm.append(addressInput, addressBtn, closeAddress)
    afterClicked.append(addressForm)

    closeAddress.addEventListener('click', ()=>{
        window.location.href= './cart.html'
    })
})

// ---------------------------------------show login user name--------------------------------------------------

let loginUser= JSON.parse(localStorage.getItem('login'))|| [];
if(loginUser.length==1){
    // document.getElementById('nav-login-link').innerText=''
    document.getElementById('nav-login-link').innerText= loginUser[0].name;
    document.getElementById('nav-login-link').href=''
    
}else{
    document.getElementById('nav-login-link').innerText= 'login';
}

if(loginUser.length==0){
    localStorage.setItem('cart', JSON.stringify([]))
}

window.onload =()=>{
    setTimeout(()=>{
        if(loginUser.length==1){
            // alert('user logged in')
            
        }else{
            window.location.href= 'signup.html' 
        }
        
    }, 20000)
}

// -----------------------------------------Logout--------------------------------------------------
let loginUser2= JSON.parse(localStorage.getItem('login'))

let showLogoutBtn=()=>{
    document.getElementById('nav-login-link').addEventListener('mouseover', ()=>{

        document.querySelector('#logout-btn-container').style.visibility= 'visible';
        document.querySelector('#logout-btn-container').addEventListener('mouseover', ()=>{
            document.querySelector('#logout-btn-container').style.visibility= 'visible';
        })
    
    })
    
    document.getElementById('nav-login-link').addEventListener('mouseleave', ()=>{
        document.querySelector('#logout-btn-container').style.visibility= 'hidden';
        document.querySelector('#logout-btn-container').addEventListener('mouseleave', ()=>{
            document.querySelector('#logout-btn-container').style.visibility= 'hidden';
        })  
    })
    
}

if (loginUser2 && loginUser2.length == 1) {
    showLogoutBtn();
}

document.getElementById('logout-btn').addEventListener('click', ()=>{
    loginUser2.splice(0, loginUser2.length)
    localStorage.setItem('login', JSON.stringify(loginUser2))
    window.location.href= './index.html'
})