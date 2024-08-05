let allData = JSON.parse(localStorage.getItem('allProducts'));
var cartData= JSON.parse(localStorage.getItem('cart'))|| [];
document.getElementById('search-query-title').innerText = allData.search;
let filteredData = allData.products
    .filter((elem) => {

        return elem.name.toLowerCase().includes(allData.search.toLowerCase());
    })

if (filteredData.length > 0) {
    filteredData.forEach((elem) => {

        let eachProduct = document.createElement('div');
        eachProduct.className = 'each-display-product-container';

        const img = document.createElement('img');
        img.className = 'each-display-img';
        img.src = elem.img;

        let eachDisplayRightContainer = document.createElement('div');
        eachDisplayRightContainer.className = 'each-display-right-container';

        const name = document.createElement('span');
        name.style.fontSize = '1.1rem';
        name.style.fontWeight = '600';
        name.innerText = elem.name;

        const oldPrice = document.createElement('strike');
        oldPrice.style.fontSize = '1.1rem';
        oldPrice.style.color = 'gray';
        oldPrice.innerText = `₹${elem.oldPrice}`;

        let newPrice = document.createElement('span');
        newPrice.style.fontSize = '2rem'
        newPrice.innerHTML = `₹${elem.newPrice} <span style="font-size: 1.1rem; background-color: #F98C8E; padding: 3px; color: white;">Save ${elem.discount}%</span>`

        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'each-add-to-cart-btn';
        addToCartBtn.innerText = 'Add to cart';

        eachDisplayRightContainer.append(name, oldPrice, newPrice, addToCartBtn)
        eachProduct.append(img, eachDisplayRightContainer)
        document.getElementById('display-products-container').append(eachProduct)

        for(let i=0; i<cartData.length; i++){
            if(elem.id==cartData[i].id){
                // alert('item already in cart')
                addToCartBtn.innerText= 'Added'
                addToCartBtn.style.opacity= '60%'
                // break;
            }    
        }

        addToCartBtn.addEventListener('click', (e)=>{
            //  var cartData= JSON.parse(localStorage.getItem('cart'))|| [];
            //  cartData.push(elem);
            //  localStorage.setItem('cart', JSON.stringify(cartData))
            //  alert('item addedd to the cart')
            //  document.querySelector('.nav-cart-counter').innerText= cartData.length;
                e.preventDefault()
            let loginUser= JSON.parse(localStorage.getItem('login'))|| [];
    
                if(loginUser.length==1){
                    let isAdded=false;
                for(let j=0; j<cartData.length; j++){
                    if(cartData[j].id==elem.id){
                        isAdded=true;
                    }
                    
                }
    
                if(!isAdded){
                    cartData.push(elem)
                    localStorage.setItem('cart', JSON.stringify(cartData))
                    addToCartBtn.innerText= 'Added'
                    addToCartBtn.style.opacity= '60%'
                    alert('Item added in cart')
                }else{
                    addToCartBtn.innerText= 'Added'
                    addToCartBtn.style.opacity= '60%'
                    alert('Item already in cart')
                }
                }else{
                     alert('Please signup')
                     setTimeout(()=>{
                        window.location.href= './signup.html'
                     }, 2000)
                    
                   
                }
    
                
                document.querySelector('.nav-cart-counter').innerText= cartData.length;
            })



    })
} else {
    document.getElementById('display-products-container').innerHTML = `
    <div class="no-search-found-container">
    <img class="no-search-found-img" src='https://www.cloudconsult.ca/public/no-search-found.png' alt="">
    </div>
    `
}

// ---------------------------------------show login user name--------------------------------------------------

let loginUser= JSON.parse(localStorage.getItem('login'))|| [];
if(loginUser.length==1){
    document.getElementById('nav-login-link').innerText= loginUser[0].name;
    document.getElementById('nav-login-link').href=''
    
}else{
    document.getElementById('nav-login-link').innerText= 'login';
}

if(loginUser.length==0){
    localStorage.setItem('cart', JSON.stringify([]))
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




