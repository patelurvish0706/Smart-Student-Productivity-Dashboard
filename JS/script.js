let LoginRegisterContainer = document.querySelector(".LoginRegisterContainer")
let page = document.getElementById('page')
let closse = document.querySelectorAll('#close')

let LoginForm = document.getElementById('loginForm')
let usersData = document.getElementById('usersData')
let RegForm = document.getElementById('registerForm')

let taskpages = document.getElementById('taskpages')

// NAVBAR - Login

let Login = () => {
    page.style.filter = ' blur(4px)'
    LoginRegisterContainer.style.display = "flex"
    usersData.style.display = "none"
    showLogin()
}

let Register = () => {
    Login()
    showReg()
}

page.style.filter = ' blur(0px)'
LoginRegisterContainer.style.display = "none"
// usersData.style.display = "none"

function closeTab() {
    page.style.filter = ' blur(0px)'
    LoginRegisterContainer.style.display = "none"
}

//  OnLogin Screen Form

function showLogin() {
    LoginForm.style.display = "flex"
    RegForm.style.display = "none"
    document.getElementById('ErrRegister').innerHTML = ``;

}

function showReg() {
    RegForm.style.display = "flex"
    LoginForm.style.display = "none"
    document.getElementById('Errlogin').innerHTML = ``;
}

// logoutId()

function logoutId() {
    document.cookie = "id=; path=/; max-age=0";
    console.log(document.cookie); // Output: username=JohnDoe
    alert("Logout Succesfull")
    window.location.reload();
}

// NightMode



// All users

function AllUsersListing() {

    page.style.filter = ' blur(4px)'
    LoginRegisterContainer.style.display = "flex"
    LoginForm.style.display = "none"
    RegForm.style.display = "none"
    usersData.style.display = "flex"

    
    let userslist = ``

    if (JSON.parse(localStorage.getItem("Users")) === null) {
        userslist = `Users not Registered yet`
    }

    if (JSON.parse(localStorage.getItem("Users"))) {
        JSON.parse(localStorage.getItem("Users")).map((user) => userslist += `<label><b>${user.uname}</b> - ${user.email}</label>`)
    }

    // innerData = JSON.parse(localStorage.getItem("Users"))[0].email
    // innerDataJSON.parse(localStorage.getItem("Users")).length                

    usersData.innerHTML = `
    <form>
        <div style="height:50px; display: flex;justify-content: space-between;align-items: center;">
            <h2>Registered Users</h2>
                <h2 id="close"
                            style="font-weight: 500; border-radius: 5px; cursor: pointer; padding:0 8px 3px 8px; background-color: #0001;"
                            onclick="closeTab()">
                            x</h2>
        </div>
        <hr id="theHr" >
        ${userslist}
        <hr id="theHr" >
        
        
        <p style="font-size:0.75rem;color:red;">
            <b>Delete All</b> removes All Users Data with their Tasks.<br>
            <b>Delete Tasks</b> removes only Users Tasks.
        </p>
        
        <div style="display: flex;">
            <button type="button" onclick="deleteEverything()" style="display:flex;align-items:center;"><span class="material-icons" style="font-size:20px;">delete</span>&nbsp;<span>All Data</span></button>
            <button type="button" onclick="deleteTasks()" style="display:flex;align-items:center;"><span class="material-icons" style="font-size:20px;">delete</span>&nbsp;<span>Tasks Only</span></button>
        </div>

        <p style="font-size:0.95rem;color:green;display:none;" id="removedTaskAlert">
            All Tasks of Users are Deleted.
        </p>
        
        </form>`

}

function deleteEverything() {
    if (confirm("Are you sure to delete All Data?")) {
        localStorage.clear();
        logoutId();
    } else {
        console.log("User clicked Cancel");
    }
}

function deleteTasks() {
    if (confirm("Are you sure to delete All Tasks?")) {
        localStorage.removeItem("Tasks");
        document.getElementById('removedTaskAlert').style.display="flex"
        setTimeout(() => {
            document.getElementById('removedTaskAlert').style.display="none"
        }, 3000);
    } else {
        console.log("User clicked Cancel");
    }
}
// TASKMANAGEMENT - Listing task

                        document.querySelector('.IntroContainer').addEventListener('click', () => {
                        if(document.getElementById('mainOpts').style.display === "flex"){
                                document.getElementById('mainOpts').style.display = "none" 
                                
                            }
                        });
                        document.querySelector('.taskManagement').addEventListener('click', () => {
                            if(document.getElementById('mainOpts').style.display === "flex"){
                                document.getElementById('mainOpts').style.display = "none" 
                            }
                            
                        });

document.getElementById('AddTask').addEventListener('click', () => {
    AddTask()
})

document.getElementById('AllTask').addEventListener('click', () => {
    AllTask()
})

document.getElementById('PendingTask').addEventListener('click', () => {
    PendingTask()
})

document.getElementById('CompletedTask').addEventListener('click', () => {
    CompletedTask()
})

document.getElementById('RemovedTask').addEventListener('click', () => {
    RemovedTask()
})