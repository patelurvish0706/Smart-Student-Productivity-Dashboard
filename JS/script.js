let LoginRegisterContainer = document.querySelector(".LoginRegisterContainer")
let page = document.getElementById('page')
let closse = document.querySelectorAll('#close')

let LoginForm = document.getElementById('loginForm')
let RegForm =  document.getElementById('registerForm')

let taskpages = document.getElementById('taskpages')

// NAVBAR - Login

let Login = () => {
    page.style.filter = ' blur(4px)'
    LoginRegisterContainer.style.display = "flex"
}

page.style.filter = ' blur(0px)'
LoginRegisterContainer.style.display = "none"

function closeTab() {    
    page.style.filter = ' blur(0px)'
    LoginRegisterContainer.style.display = "none"
}

//  OnLogin Screen Form

function showLogin(){
    LoginForm.style.display = "flex"
    RegForm.style.display = "none"
    document.getElementById('ErrRegister').innerHTML = ``;
    
}

function showReg(){
    RegForm.style.display = "flex"
    LoginForm.style.display = "none"
    document.getElementById('Errlogin').innerHTML = ``;
}

// logoutId()

function logoutId(){
    document.cookie = "id=; path=/; max-age=0";
    console.log(document.cookie); // Output: username=JohnDoe
    alert("Logout Succesfull")
    window.location.reload();
}

// TASKMANAGEMENT - Listing task

document.getElementById('AddTask').addEventListener('click',()=>{
    AddTask()
})

document.getElementById('AllTask').addEventListener('click',()=>{
    AllTask()
})

document.getElementById('PendingTask').addEventListener('click',()=>{
    PendingTask()
})

document.getElementById('CompletedTask').addEventListener('click',()=>{
    CompletedTask()
})

document.getElementById('RemovedTask').addEventListener('click',()=>{
    RemovedTask()
})