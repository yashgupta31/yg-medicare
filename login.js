// document.querySelector('.login-name-input')
var signupUsers= JSON.parse(localStorage.getItem('users'));
document.getElementById('login-right-container').addEventListener('submit', (e)=>{
    e.preventDefault();
    let loginName= document.querySelector('.login-name-input').value;
    let loginPass= document.querySelector('.login-password-input').value;
    // document.querySelector('.login-name-input').value='';
    // document.querySelector('.login-password-input').value='';

    // let isLogin= false;
    let showAlert= false;
    let loginUser= JSON.parse(localStorage.getItem('login'))|| [];
    for(let i=0; i<signupUsers.length; i++){
        if(loginName== signupUsers[i].name && loginPass== signupUsers[i].password){
            loginUser.splice(0, loginUser.length);
            loginUser.push(signupUsers[i]);
            localStorage.setItem('login', JSON.stringify(loginUser))
            window.location.href = './index.html';
            return;

        }
        else{
            showAlert= true;
        }
    }

    if(showAlert){
        alert('something went wrong')
    }
})






document.querySelector('.signup-now-link').addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = './signup.html';
})

document.querySelector('.back-to-home').addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = './index.html';
})