function clearActive(){
    document.getElementById("AddTask").style.color = "#6c7f8e"
    document.getElementById("AddTask").style.backgroundColor = "#fff"

    document.getElementById("AllTask").style.color = "#6c7f8e"
    document.getElementById("AllTask").style.backgroundColor = "#fff"

    document.getElementById("PendingTask").style.color = "#6c7f8e"
    document.getElementById("PendingTask").style.backgroundColor = "#fff"

    document.getElementById("CompletedTask").style.color = "#6c7f8e"
    document.getElementById("CompletedTask").style.backgroundColor = "#fff"

    document.getElementById("RemovedTask").style.color = "#6c7f8e"
    document.getElementById("RemovedTask").style.backgroundColor = "#fff"

}

let AddTask = () => {
    clearActive()

    document.getElementById("AddTask").style.color = "#fff"
    document.getElementById("AddTask").style.backgroundColor = "#6c7f8e"

    const date = new Date();
    let validdate = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0");

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
            return;
        }

        console.log("submitted");

        let status = "pending"
        let thetask = new Task(title, description, deadlineDate, deadlineTime, status)
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
    clearActive()

    document.getElementById("AllTask").style.color = "#fff"
    document.getElementById("AllTask").style.backgroundColor = "#6c7f8e"


    let id = document.cookie;
    if (!id) {
        Login();
        return;
    }

    let userId = parseInt(id.slice(3));
    let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    let userTasks = tasks[userId] || [];

    let container = document.getElementById("taskpages");

    // let validTasks = userTasks.filter(t => t.status !== "delete");

    // if (validTasks.length === 0) {
    if (userTasks.length === 0) {
        container.innerHTML = `
        <fieldset style="display:flex;align-items: center;justify-content: start;height:400px;">
            <p style="margin:10px 0 30px;">No Tasks are added</p>
        </fieldset>`;
        return;
    }

    userTasks = userTasks.map((task,i)=>({
        ...task,
        realIndex:i
    }));

    userTasks.sort((a,b)=>
        new Date(a.time+"T"+a.date) - new Date(b.time+"T"+b.date)
    );

    // group by date
    let grouped = {};

    userTasks.forEach(task=>{
        // if(task.status === "delete") return;

        if(!grouped[task.time]) grouped[task.time] = [];

        grouped[task.time].push(task);
    });

    let now = new Date();
    let html = `<div id="ListingAllTask">`;

    for(let date in grouped){

        html += `<fieldset>
        <legend>&nbsp;${date}&nbsp;</legend>`;

       grouped[date].forEach(task => {

    let taskDateTime = new Date(task.time + "T" + task.date);

    // change pending → due if time passed
    if (task.status === "pending" && taskDateTime < now) {
        task.status = "due";
    }

    let style = "";

    if (task.status === "complete") {
        style = "background:#ecffeb;";
        // green
    }

    if (task.status === "pending") {
        style = "background:#ebf3ff;";
        // blue
    }

    if (task.status === "due") {
        style = "background:#ffecec;";
        // red
    }

    if (task.status === "delete") {
        style = "background:#ececec;";
        // lightBlack
    }

    html += `
    <form class="theListForm" data-index="${task.realIndex}" style="${style};border-radius:10px;">

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

                <button type="button" onclick="editTask(this,AllTask)">
                    <span class="material-icons">edit</span>
                </button>

                <button type="button" onclick="completeTask(this,AllTask)">
                    <span class="material-icons">event_available</span>
                </button>

                <button type="button" onclick="BackPendingTask(this,AllTask)">
                    <span class="material-icons">event_busy</span>
                </button>

                <button type="button" onclick="deleteTask(this,AllTask)">
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
}

// Base function

function editTask(btn) {

    let form = btn.closest("form");
    let title = form.querySelector(".title");
    let desc = form.querySelector(".description");
    let icon = btn.querySelector("span");

    if (icon.innerText === "edit") {

        title.removeAttribute("readonly");
        desc.removeAttribute("readonly");

        icon.innerText = "save";

        title.style.backgroundColor = "#fff"
        desc.style.backgroundColor = "#fff"
        title.focus()

    } else {

        let index = form.dataset.index;
        let userId = parseInt(document.cookie.slice(3,))
        let tasks = JSON.parse(localStorage.getItem("Tasks"));

        tasks[userId][index].title = title.value;
        tasks[userId][index].desc = desc.value;

        localStorage.setItem("Tasks", JSON.stringify(tasks));

        title.style.backgroundColor = "#f7f7f7"
        desc.style.backgroundColor = "#f7f7f7"

        title.setAttribute("readonly", true);
        desc.setAttribute("readonly", true);

        icon.innerText = "edit";
    }
}

function completeTask(btn,section){

    let form = btn.closest("form");
    let index = form.dataset.index;

    let userId = parseInt(document.cookie.slice(3,))
    let tasks = JSON.parse(localStorage.getItem("Tasks"));

    tasks[userId][index].status = "complete";

    localStorage.setItem("Tasks", JSON.stringify(tasks));

    section();
}

function deleteTask(btn,section){

    let form = btn.closest("form");
    let index = form.dataset.index;

    let userId = parseInt(document.cookie.slice(3,))
    let tasks = JSON.parse(localStorage.getItem("Tasks"));

    tasks[userId][index].status = "delete";

    localStorage.setItem("Tasks", JSON.stringify(tasks));

    section();
}

function BackPendingTask(btn,section){

    let form = btn.closest("form");
    let index = form.dataset.index;

    let userId = parseInt(document.cookie.slice(3,))
    let tasks = JSON.parse(localStorage.getItem("Tasks"));

    tasks[userId][index].status = "pending";

    localStorage.setItem("Tasks", JSON.stringify(tasks));

    section();
}

// ------------------------------------------------------------

let PendingTask = () => {
    clearActive()

    document.getElementById("PendingTask").style.color = "#fff"
    document.getElementById("PendingTask").style.backgroundColor = "#6c7f8e"


    let id = document.cookie;
    if (!id) {
        Login();
        return;
    }

    let userId = parseInt(id.slice(3));
    let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    let userTasks = tasks[userId] || [];

    let container = document.getElementById("taskpages");

    let validTasks = userTasks.filter(t => t.status === "pending");

    if (validTasks.length === 0) {
    // if (userTasks.length === 0) {
        container.innerHTML = `
        <fieldset style="display:flex;align-items: center;justify-content: start;height:400px;">
            <p style="margin:10px 0 30px;">No Tasks are added</p>
        </fieldset>`;
        return;
    }

    userTasks = userTasks.map((task,i)=>({
        ...task,
        realIndex:i
    }));

    userTasks.sort((a,b)=>
        new Date(a.time+"T"+a.date) - new Date(b.time+"T"+b.date)
    );

    // group by date
    let grouped = {};

    userTasks.forEach(task=>{
        if(task.status !== "pending") return;

        if(!grouped[task.time]) grouped[task.time] = [];

        grouped[task.time].push(task);
    });

    let now = new Date();
    let html = `<div id="ListingAllTask">`;

    for(let date in grouped){

        html += `<fieldset>
        <legend>&nbsp;${date}&nbsp;</legend>`;

       grouped[date].forEach(task => {

    let taskDateTime = new Date(task.time + "T" + task.date);

    // change pending → due if time passed
    if (task.status === "pending" && taskDateTime < now) {
        task.status = "due";
    }

    let style = "";

    if (task.status === "complete") {
        style = "background:#ecffeb;";
        // green
    }

    if (task.status === "pending") {
        style = "background:#ebf3ff;";
        // blue
    }

    if (task.status === "due") {
        style = "background:#ffecec;";
        // red
    }

    if (task.status === "delete") {
        style = "background:#ececec;";
        // lightBlack
    }

    html += `
    <form class="theListForm" data-index="${task.realIndex}" style="${style};border-radius:10px;">

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

                <button type="button" onclick="editTask(this,PendingTask)" title="Edit">
                    <span class="material-icons">edit</span>
                </button>

                <button type="button" onclick="completeTask(this,PendingTask)" title="Complete">
                    <span class="material-icons">event_available</span>
                </button>

                <button type="button" onclick="deleteTask(this,PendingTask)" title="Delete">
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
}

let CompletedTask = () => {
    clearActive()

    document.getElementById("CompletedTask").style.color = "#fff"
    document.getElementById("CompletedTask").style.backgroundColor = "#6c7f8e"


    let id = document.cookie;
    if (!id) {
        Login();
        return;
    }

    let userId = parseInt(id.slice(3));
    let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    let userTasks = tasks[userId] || [];

    let container = document.getElementById("taskpages");

    let validTasks = userTasks.filter(t => t.status === "complete");

    if (validTasks.length === 0) {
    // if (userTasks.length === 0) {
        container.innerHTML = `
        <fieldset style="display:flex;align-items: center;justify-content: start;height:400px;">
            <p style="margin:10px 0 30px;">No Tasks are added</p>
        </fieldset>`;
        return;
    }

    userTasks = userTasks.map((task,i)=>({
        ...task,
        realIndex:i
    }));

    userTasks.sort((a,b)=>
        new Date(a.time+"T"+a.date) - new Date(b.time+"T"+b.date)
    );

    // group by date
    let grouped = {};

    userTasks.forEach(task=>{
        if(task.status !== "complete") return;

        if(!grouped[task.time]) grouped[task.time] = [];

        grouped[task.time].push(task);
    });

    let now = new Date();
    let html = `<div id="ListingAllTask">`;

    for(let date in grouped){

        html += `<fieldset>
        <legend>&nbsp;${date}&nbsp;</legend>`;

       grouped[date].forEach(task => {

    let taskDateTime = new Date(task.time + "T" + task.date);

    // change pending → due if time passed
    if (task.status === "pending" && taskDateTime < now) {
        task.status = "due";
    }

    let style = "";

    if (task.status === "complete") {
        style = "background:#ecffeb;";
        // green
    }

    if (task.status === "pending") {
        style = "background:#ebf3ff;";
        // blue
    }

    if (task.status === "due") {
        style = "background:#ffecec;";
        // red
    }

    if (task.status === "delete") {
        style = "background:#ececec;";
        // lightBlack
    }

    html += `
    <form class="theListForm" data-index="${task.realIndex}" style="${style};border-radius:10px;">

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

                <button type="button" onclick="BackPendingTask(this,CompletedTask)" title="Pending">
                    <span class="material-icons">event_busy</span>
                </button>

                <button type="button" onclick="deleteTask(this,CompletedTask)" title="Delete">
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
}

let RemovedTask = () => {
    clearActive()

    document.getElementById("RemovedTask").style.color = "#fff"
    document.getElementById("RemovedTask").style.backgroundColor = "#6c7f8e"

    let id = document.cookie;
    if (!id) {
        Login();
        return;
    }

    let userId = parseInt(id.slice(3));
    let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    let userTasks = tasks[userId] || [];

    let container = document.getElementById("taskpages");

    let validTasks = userTasks.filter(t => t.status === "delete");

    if (validTasks.length === 0) {
    // if (userTasks.length === 0) {
        container.innerHTML = `
        <fieldset style="display:flex;align-items: center;justify-content: start;height:400px;">
            <p style="margin:10px 0 30px;">No Tasks are added</p>
        </fieldset>`;
        return;
    }

    userTasks = userTasks.map((task,i)=>({
        ...task,
        realIndex:i
    }));

    userTasks.sort((a,b)=>
        new Date(a.time+"T"+a.date) - new Date(b.time+"T"+b.date)
    );

    // group by date
    let grouped = {};

    userTasks.forEach(task=>{
        if(task.status !== "delete") return;

        if(!grouped[task.time]) grouped[task.time] = [];

        grouped[task.time].push(task);
    });

    let now = new Date();
    let html = `<div id="ListingAllTask">`;

    for(let date in grouped){

        html += `<fieldset>
        <legend>&nbsp;${date}&nbsp;</legend>`;

       grouped[date].forEach(task => {

    let taskDateTime = new Date(task.time + "T" + task.date);

    // change pending → due if time passed
    if (task.status === "pending" && taskDateTime < now) {
        task.status = "due";
    }

    let style = "";

    if (task.status === "complete") {
        style = "background:#ecffeb;";
        // green
    }

    if (task.status === "pending") {
        style = "background:#ebf3ff;";
        // blue
    }

    if (task.status === "due") {
        style = "background:#ffecec;";
        // red
    }

    if (task.status === "delete") {
        style = "background:#ececec;";
        // lightBlack
    }

    html += `
    <form class="theListForm" data-index="${task.realIndex}" style="${style};border-radius:10px;">

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

                
                <button type="button" onclick="BackPendingTask(this,RemovedTask)" title="Restore">
                    <span class="material-icons">undo</span>
                </button>

            </div>

        </div>

    </form>`;
});

    html += `</fieldset>`;
    }

    html += `</div>`;

    container.innerHTML = html;
}