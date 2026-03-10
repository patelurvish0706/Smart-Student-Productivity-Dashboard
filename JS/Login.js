class User {
    constructor(uname, email, pass) {
        this.uname = uname
        this.email = email
        this.pass = pass
    }
}

class Task {
    constructor(title, desc, time, date) {
        this.title = title
        this.desc = desc
        this.time = time
        this.date = date
    }
}

class TaskManager {
    users
    tasks

    constructor() {
        this.users = []
        this.tasks = []
    }

    // ---- On Register
    addUser(user) {
        // let isExist = this.users.filter((userEx) => userEx.email == user.email)
        
        if(JSON.parse(localStorage.getItem("Users")) == null){
            localStorage.setItem("Users", "[]")
        }
             
        if(JSON.parse(localStorage.getItem("Tasks")) == null){
            localStorage.setItem("Tasks", "[]")
        }

        let allUsers = JSON.parse(localStorage.getItem("Users"));
        
        let allTaskList = JSON.parse(localStorage.getItem("Tasks"));
        
        let isExist = allUsers.findIndex(userX => userX.email == user.email)
        // console.log(isExist);
        
        if(isExist < 0){
            // this.users.push(user)
            allUsers.push(user)
            localStorage.setItem("Users", JSON.stringify(allUsers));
            allTaskList.push([]);
            localStorage.setItem("Tasks", JSON.stringify(allTaskList));

            // console.log(`${user.uname} is added`);  
            // return "Register Succesfull";
            return true
        }else{
            // console.log(`${user.uname} is already exist`);
            return false
            // return "Email already Exist";
        }

    }

    addTask(task) {
        // let isExist = this.users.filter((userEx) => userEx.email == user.email)
        
        let allTaskList = JSON.parse(localStorage.getItem("Tasks"));
        console.log(allTaskList);
        
        let userId = parseInt(document.cookie.slice(3,))
        console.log(userId);
        
        allTaskList[userId].push(task)
        
        
        localStorage.setItem("Tasks", JSON.stringify(allTaskList));
        console.log(allTaskList);
        return "Task Added"
        

    }

    tryLogin(email, pass) {

        if(JSON.parse(localStorage.getItem("Users")) == null){
            return -2
        }
        
        let allUsers = JSON.parse(localStorage.getItem("Users")); 
        
        let isExist = allUsers.findIndex(userX => userX.email == email && userX.email == pass)
        
        // console.log('isExist ',isExist);

        return isExist;
        
        // if(isExist < 0){
        //     // -1 means not available
        //     return false;   
        // }else{
        //     return isExist;   
        // }
            
    }

    allUsers() {
        return JSON.parse(localStorage.getItem("Users"));
    }

}

// let user1 = new User("urvish", "urvish@gmail.com", 111)
// let user2 = new User("alice", "urvish@gmail.com", 111)
// let user3 = new User("bruce", "urvish@gmail.com", 111)
// let user4 = new User("charlie", "urvish@gmail.com", 111)
// let user5 = new User("daccon", "urvish@gmail.com", 111)

let DOit = new TaskManager()

// register
// DOit.addUser(user1)
// DOit.addUser(user2)
// DOit.addUser(user2)
// DOit.addUser(user3)
// DOit.addUser(user4)
// DOit.addUser(user1)
// DOit.addUser(user5)

// DOit.addUser(new User("aryan", "urssdfdsdvish@gmail.com", 222))

// let allUsers = DOit.allUsers()
// console.log(allUsers);

// DOit.tryLogin("urvish",111)
// DOit.tryLogin("urvissh",111)
// DOit.tryLogin("urvissh",1121)

// localStorage.setItem("username", "JohnDoe");
// console.log(localStorage.getItem("username")); // Output: JohnDoe// Retrieve an item
// localStorage.removeItem("username");
// localStorage.clear();

// document.cookie = "username=JohnDoe; path=/; max-age=3600"; // Expires in 1 hour
// console.log(document.cookie); // Output: username=JohnDoe
// document.cookie = "username=; path=/; max-age=0";
