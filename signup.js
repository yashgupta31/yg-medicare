var signupUsers= JSON.parse(localStorage.getItem('users'))|| []

document.getElementById('signup-right-container').addEventListener('submit', (e)=>{
    e.preventDefault();
    let name= document.querySelector('.signup-name-input').value;
    let password= document.querySelector('.signup-password-input').value;
    let eachUser={};
    eachUser.name= name;
    eachUser.password= password;
    signupUsers.push(eachUser)
    localStorage.setItem('users', JSON.stringify(signupUsers))
    
    document.querySelector('.signup-name-input').value='';
    document.querySelector('.signup-password-input').value='';
    alert(`signup successfull ${name}`)
    setTimeout(()=>{
        window.location.href = './login.html';
    }, 400)
    
})


document.querySelector('.back-to-home').addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = './index.html';
})

// 
document.querySelector('.login-now-link').addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = './login.html';
})