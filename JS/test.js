// // // let task = [];
// // // let cokie = 1

// // // // add new user
// // // function addUser() {
// // //     task.push([]);   // new user with empty task list
// // // }

// // // // add task to user
// // // function addTask( title, desc, compTime, deadDate) {

// // //     const newTask = {
// // //         title,
// // //         desc,
// // //         compTime,
// // //         deadDate
// // //     };

// // //     task[cokie].push(newTask);
// // // }


// // // // example
// // // addUser();   // user 0
// // // addUser();   // user 1
// // // addUser();   // user 1

// // // addTask("Login", "Create login page", "2h", "2026-03-10");
// // // addTask("Dashboard", "Build dashboard", "3h", "2026-03-12");
// // // addTask("API", "Connect API", "4h", "2026-03-11");

// // // console.log(task);
// // var a = 1;

// // function test() {
// //     let a = 2;
// //     console.log(a);
// // }

// // test();

// class User {
//     constructor(uname, email, pass) {
//         this.uname = uname
//         this.email = email
//         this.pass = pass
//     }
// }

// class Task {
//     constructor(title, desc, time, date) {
//         this.title = title
//         this.desc = desc
//         this.time = time
//         this.date = date
//     }
// }

// class TaskManager {
//     users
//     tasks

//     constructor() {
//         this.users = []
//         this.tasks = []
//     }

//     // ---- On Register
//     addUser(user) {
//         // let isExist = this.users.filter((userEx) => userEx.email == user.email)

//         if(JSON.parse(localStorage.getItem("Users")) == null){
//             localStorage.setItem("Users", "[]")
//         }

//         if(JSON.parse(localStorage.getItem("Tasks")) == null){
//             localStorage.setItem("Tasks", "[]")
//         }

//         let allUsers = JSON.parse(localStorage.getItem("Users"));

//         let allTaskList = JSON.parse(localStorage.getItem("Tasks"));

//         let isExist = allUsers.findIndex(userX => userX.email == user.email)
//         // console.log(isExist);

//         if(isExist < 0){
//             // this.users.push(user)
//             allUsers.push(user)
//             localStorage.setItem("Users", JSON.stringify(allUsers));
//             allTaskList.push([]);
//             localStorage.setItem("Tasks", JSON.stringify(allTaskList));

//             // console.log(`${user.uname} is added`);  
//             // return "Register Succesfull";
//             return true
//         }else{
//             // console.log(`${user.uname} is already exist`);
//             return false
//             // return "Email already Exist";
//         }

//     }

//     addTask(task) {
//         // let isExist = this.users.filter((userEx) => userEx.email == user.email)

//         let allTaskList = JSON.parse(localStorage.getItem("Tasks"));
//         console.log(allTaskList);

//         let userId = parseInt(document.cookie.slice(3,))
//         console.log(userId);

//         allTaskList[userId].push(task)


//         localStorage.setItem("Tasks", JSON.stringify(allTaskList));
//         console.log(allTaskList);
//         return "Task Added"


//     }

//     tryLogin(email, pass) {

//         if(JSON.parse(localStorage.getItem("Users")) == null){
//             return -2
//         }

//         let allUsers = JSON.parse(localStorage.getItem("Users")); 

//         let isExist = allUsers.findIndex(userX => userX.email == email && userX.email == pass)

//         // console.log('isExist ',isExist);

//         return isExist;

//         // if(isExist < 0){
//         //     // -1 means not available
//         //     return false;   
//         // }else{
//         //     return isExist;   
//         // }

//     }

//     allUsers() {
//         return JSON.parse(localStorage.getItem("Users"));
//     }

// }

// // let user1 = new User("urvish", "urvish@gmail.com", 111)
// // let user2 = new User("alice", "urvish@gmail.com", 111)
// // let user3 = new User("bruce", "urvish@gmail.com", 111)
// // let user4 = new User("charlie", "urvish@gmail.com", 111)
// // let user5 = new User("daccon", "urvish@gmail.com", 111)

// let DOit = new TaskManager()

// // register
// // DOit.addUser(user1)
// // DOit.addUser(user2)
// // DOit.addUser(user2)
// // DOit.addUser(user3)
// // DOit.addUser(user4)
// // DOit.addUser(user1)
// // DOit.addUser(user5)

// // DOit.addUser(new User("aryan", "urssdfdsdvish@gmail.com", 222))

// // let allUsers = DOit.allUsers()
// // console.log(allUsers);

// // DOit.tryLogin("urvish",111)
// // DOit.tryLogin("urvissh",111)
// // DOit.tryLogin("urvissh",1121)

// // localStorage.setItem("username", "JohnDoe");
// // console.log(localStorage.getItem("username")); // Output: JohnDoe// Retrieve an item
// // localStorage.removeItem("username");
// // localStorage.clear();

// // document.cookie = "username=JohnDoe; path=/; max-age=3600"; // Expires in 1 hour
// // console.log(document.cookie); // Output: username=JohnDoe
// // document.cookie = "username=; path=/; max-age=0";

let AllTaskOrignal = () => {

    let id = document.cookie;
    if (id == '') {
        Login()
        return
    }

    let userId = parseInt(document.cookie.slice(3,))


    let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    let userTasks = tasks[userId] || [];

    let container = document.getElementById("taskpages");

    // sort by date and time (earliest = highest priority)
    userTasks.sort((a, b) => {
        let d1 = new Date(a.time + " " + a.date);
        let d2 = new Date(b.time + " " + b.date);
        return d1 - d2;
    });

    let grouped = {};

    userTasks.forEach(t => {
        if (!grouped[t.time]) {
            grouped[t.time] = [];
        }
        grouped[t.time].push(t);
    });
    let html = `<div id="ListingAllTask">`;

    if (JSON.parse(localStorage.getItem("Tasks")) == "" || JSON.parse(localStorage.getItem("Tasks")) == null) {
        html += `<fieldset style="height:400px;justify-content:start;">
                    <p style="margin:10px 0 30px;">No Tasks are added</p>
                </fieldset>`;
    } else {

        for (let date in grouped) {

            html += `<fieldset>
            <legend>&nbsp;${date}&nbsp;</legend>
            `;

            grouped[date].forEach(task => {
                html += `
        <form class="theListForm" >
            <div id="TaskListTiming" >
                <div id="taskTime">${task.date}</div>
            </div>

            <div id="theInnerTask">
                <div id="theInnerTaskInputs" >
                    <input type="text" id="title" name="title" value="${task.title}" readonly/>
                    
                    <textarea id="description" name="description" rows="5" readonly >${task.desc}</textarea>
                    
                </div>
                
                <div id="listedOptBtns" >

                    <button type="button">
                        <span class="material-icons">edit</span>
                    </button>

                    <button type="button">
                        <span class="material-icons">check</span>
                    </button>

                    <button type="reset">
                        <span class="material-icons">delete</span>
                     </button>

                </div>

            </div>
        </form>
        `;
            });

            html += `</fieldset>`;
        }

    }
    html += `</div>`;

    container.innerHTML = html;

}



let AllTask2 = () => {

    let id = document.cookie;
    if (id == '') {
        Login()
        return
    }

    let userId = parseInt(document.cookie.slice(3,))
    let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    let userTasks = tasks[userId] || [];

    let container = document.getElementById("taskpages");

    userTasks.sort((a, b) => {
        let d1 = new Date(a.time + " " + a.date);
        let d2 = new Date(b.time + " " + b.date);
        return d1 - d2;
    });

    let grouped = {};
    userTasks.forEach((t, i) => {
        if (!grouped[t.time]) grouped[t.time] = [];
        grouped[t.time].push({ ...t, index: i });
    });

    let now = new Date();
    let html = `<div id="ListingAllTask">`;

    if (JSON.parse(localStorage.getItem("Tasks")) == "" || JSON.parse(localStorage.getItem("Tasks")) == null) {
        html += `<fieldset style="height:400px;justify-content:start;">
                    <p style="margin:10px 0 30px;">No Tasks are added</p>
                </fieldset>`;
    } else {

        for (let date in grouped) {

            let now = new Date();

        grouped[date].forEach(task => {

    let taskDateTime = new Date(task.time + "T" + task.date);
    let style = taskDateTime < now ? `style="background:#fff4f4;"` : "";

    html += `
    <p id="theListedEditErr"></p>

    <form class="theListForm" data-index="${task.index}" ${style}>
        <div id="TaskListTiming">
            <div id="taskTime">${task.date}</div>
        </div>

        <div id="theInnerTask">

            <div id="theInnerTaskInputs">

                <input type="text" class="title"
                value="${task.title}" readonly/>

                <textarea class="description"
                rows="5" readonly>${task.desc}</textarea>

            </div>

            <div id="listedOptBtns">

                <button type="button" onclick="editTask(this)">
                    <span class="material-icons">edit</span>
                </button>

                <button type="button" onclick="completeTask(this)">
                    <span class="material-icons">check</span>
                </button>

                <button type="button" onclick="deleteTask(this)">
                    <span class="material-icons">delete</span>
                </button>

            </div>

        </div>
    </form>`;
});

            html += `</fieldset>`;
        }
    }

    html += `</div>`;
    container.innerHTML = html;
}

let AllTask3 = () => {

    let id = document.cookie;
    if (!id) {
        Login();
        return;
    }

    let userId = parseInt(id.slice(3));
    let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    let userTasks = tasks[userId] || [];

    let container = document.getElementById("taskpages");

    if (userTasks.length === 0) {
        container.innerHTML = `
        <fieldset style="height:400px;">
            <p style="margin:10px 0 30px;">No Tasks are added</p>
        </fieldset>`;
        return;
    }

    // sort by datetime
    userTasks.sort((a, b) =>
        new Date(a.time + "T" + a.date) - new Date(b.time + "T" + b.date)
    );

    // group by DATE
    let grouped = {};
    userTasks.forEach((task, i) => {
        if (!grouped[task.time]) grouped[task.time] = [];
        grouped[task.time].push({ ...task, index: i });
    });

    let now = new Date();
    let html = `<div id="ListingAllTask">`;

    for (let date in grouped) {

        html += `
        <fieldset>
        <legend>&nbsp;${date}&nbsp;</legend>`;

        grouped[date].forEach(task => {

            if (task.status === "delete") return;

            let taskDateTime = new Date(task.time + "T" + task.date);
            let expired = taskDateTime < now;

            html += `
            <form class="theListForm" data-index="${task.index}" 
            style="${expired ? "background:#fff4f4;border-radius:10px;" : ""}">

                <div id="TaskListTiming">
                    <div id="taskTime">${task.date}</div>
                </div>

                <div id="theInnerTask">

                    <div id="theInnerTaskInputs">

                        <input type="text" class="title"
                        value="${task.title}" readonly/>

                        <textarea class="description"
                        rows="5" readonly>${task.desc}</textarea>

                    </div>

                    <div id="listedOptBtns">

                        <button type="button" onclick="editTask(this)">
                            <span class="material-icons">edit</span>
                        </button>

                        <button type="button" onclick="completeTask(this)">
                            <span class="material-icons">check</span>
                        </button>

                        <button type="button" onclick="deleteTask(this)">
                            <span class="material-icons">delete</span>
                        </button>

                    </div>

                </div>

            </form>`;
        });

        html += `</fieldset>`;
    }

    html += `</div>`;
    container.innerHTML = html;
};


{/* <span class="material-symbols-outlined">
restore_from_trash
</span> */}