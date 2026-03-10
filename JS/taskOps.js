let AddTask = () => {

    const date = new Date();
    let validdate = date.getFullYear()+"-"+(date.getMonth() + 1).toString().padStart(2,"0")+"-"+date.getDate().toString().padStart(2,"0");

    taskpages.innerHTML = `
    <div id="addingTask">
                <fieldset>
                    <legend>&nbsp;Add Details About Task&nbsp;</legend>
                    <form id="AddingTaskForm">

                        <p id="addFormErr" style="color:red;margin-bottom:10px;"></p>

                        <label for="title">Title</label>
                        <input type="text" id="title" name="title" placeholder="Write subject Title here."/>

                        <label for="description">Description</label>
                        <textarea type="text" id="description" name="description" rows="5" style="resize: vertical;" placeholder="Write Description about Task here." ></textarea>

                        <label for="deadlineTime">Completion Time</label>
                        <input type="time" value="00:00" id="deadlineTime" name="deadlineTime"/>

                        <label for="deadlineDate">Deadline Date</label>
                        <input type="date" id="deadlineDate" min=${validdate} name="deadlineDate" />

                        <div>
                            <button type="submit" >Add Task</button>
                            <button type="reset" >Cancel</button>
                        </div>
                    </form>
                </fieldset>
            </div>`

        let AddingTaskForm = document.getElementById('AddingTaskForm')

        AddingTaskForm.addEventListener("submit", (e) => {
        e.preventDefault()

        if (document.cookie === '') {
            console.log("Not logged in")
            Login();
            return
        }

        const addFormErr = document.getElementById('addFormErr')

        // Validations
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const deadlineTime = document.getElementById('deadlineTime').value
        const deadlineDate = document.getElementById('deadlineDate').value

        if (!title || !description || !deadlineTime || !deadlineDate) {
            addFormErr.innerText = "All * fields are required";
            return;
        }
        
        const selectedDate = new Date(deadlineDate + "T" + deadlineTime);
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            addFormErr.innerText = "Deadline must be future date and time";
            return ;
        }

        console.log("submitted");

        let thetask = new Task(title, description , deadlineDate, deadlineTime)
        console.log(thetask);
        
        let msg = DOit.addTask(thetask)

        addFormErr.innerHTML = `<p style='color:green'>${msg}</p>`;

        AddingTaskForm.reset();
        
        setTimeout(() => {
            // showLogin()
            addFormErr.innerHTML = ``;
        }, 1000);
        // console.log(title, description , deadlineDate, deadlineTime);
        
        
    })

}
AddTask()

let AllTask = () => {

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
userTasks.sort((a,b)=>{
    let d1 = new Date(a.time + " " + a.date);
    let d2 = new Date(b.time + " " + b.date);
    return d1 - d2;
});

let grouped = {};

userTasks.forEach(t=>{
    if(!grouped[t.time]){
        grouped[t.time] = [];
    }
    grouped[t.time].push(t);
});
let html = `<div id="ListingAllTask">`;

for(let date in grouped){

    html += `
    <fieldset>
        <legend>&nbsp;${date}&nbsp;</legend>
    `;

    grouped[date].forEach(task=>{
        html += `
        <form class="theListForm" >
            <div id="TaskListTiming" >
                <div id="taskTime">${task.date}</div>
            </div>

            <div id="theInnerTask">
                <div id="theInnerTaskInputs" >
                    <input type="text" id="title" name="title" value="${task.title}" />
                    
                    <textarea id="description" name="description" rows="5" >${task.desc}</textarea>
                    
                </div>
                
                <div id="listedOptBtns" >

                    <button type="button">
                        <span class="material-icons">edit</span>
                    </button>

                    <button type="submit">
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

html += `</div>`;

container.innerHTML = html;

// }
    /*
    taskpages.innerHTML = ` 
        <div id="ListingAllTask">
                <fieldset>
                    <legend>&nbsp;04 / 02 / 2026&nbsp;</legend>

                    <form style="display: flex;flex-direction: row; width: 80%;">
                        <div id="TaskTiming" style="width: 30%;text-align: center;">
                            <div id="taskTime" style="padding: 8px 10px;">03:55 AM</div>
                        </div>
                        <div id="theTask" style="display:flex;flex-direction: column;width: 100%;">
                            <div style="display: flex; width: 100%;">
                                <input style="width: 70%;margin-bottom: 5px;" type="text" id="title" name="title" placeholder="Complete Whole Project"/>
                                <div style="display: flex; width: 40%;">
                               
                                    <button style="margin: 0 0 5px 5px;width: 50%;" type="button" > 
                                        <span class="material-icons">edit</span>
                                    </button>

                                    <button style="margin: 0 0 5px 5px;width: 50%;" type="submit" >
                                        <span class="material-icons">check</span>
                                    </button>

                                    <button style="margin: 0 0 5px 5px;width: 50%;" type="reset" >
                                        <span class="material-icons">delete</span>
                                    </button>
                                </div>
                            </div>
                            <textarea type="text" id="description" name="description" rows="5" style="resize: vertical;" placeholder="Student Productivity System is pending. also need to add all functionallities in real." ></textarea>
                        </div>
                    </form>

                    <form style="display: flex;flex-direction: row; width: 80%;">
                        <div id="TaskTiming" style="width: 30%;text-align: center;">
                            <div id="taskTime" style="padding: 8px 10px;">04:20 AM</div>
                        </div>
                        <div id="theTask" style="display:flex;flex-direction: column;width: 100%;">
                            <div style="display: flex; width: 100%;">
                                <input style="width: 70%;margin-bottom: 5px;" type="text" id="title" name="title" value="Write subject Title here." disabled/>
                                <div style="display: flex; width: 40%;">
                                    <button style="margin: 0 0 5px 5px;width: 50%;" type="button" >Edit</button>
                                    <button style="margin: 0 0 5px 5px;width: 50%;" type="submit" >Completed</button>
                                    <button style="margin: 0 0 5px 5px;width: 50%;" type="reset" >Remove</button>
                                </div>
                            </div>
                            <textarea type="text" id="description" name="description" rows="5" style="resize: vertical;" placeholder="Write Description about Task here." ></textarea>
                        </div>
                    </form>
                </fieldset>

                <fieldset>
                    <legend>&nbsp;05 / 02 / 2026&nbsp;</legend>
                
                </fieldset>
                <fieldset>
                    <legend>&nbsp;06 / 02 / 2026&nbsp;</legend>
                
                </fieldset>
            </div>` */
}

let PendingTask = () => {

    let id = document.cookie;
    if (id == '') {
        Login()
        return
    }

    taskpages.innerHTML = `Pending List`
}

let CompletedTask = () => {

    let id = document.cookie;
    if (id == '') {
        Login()
        return
    }

    taskpages.innerHTML = `Completed List`
}

let RemovedTask = () => {

    let id = document.cookie;
    if (id == '') {
        Login()
        return
    }

    taskpages.innerHTML = `Removed`
}