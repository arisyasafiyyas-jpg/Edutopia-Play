// ===============================
// STUDYHUB TO-DO LIST
// ===============================

const taskInput = document.getElementById("taskInput");
const subject = document.getElementById("subject");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");

const addTaskBtn = document.getElementById("addTask");

const taskContainer = document.getElementById("taskContainer");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const clearCompleted = document.getElementById("clearCompleted");

// ===============================
// LOAD TASKS
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();


// ===============================
// ADD TASK
// ===============================

addTaskBtn.addEventListener("click", function () {

    if (taskInput.value.trim() === "") {

        alert("Please enter a task.");

        return;

    }

    const task = {

        name: taskInput.value,

        subject: subject.value,

        dueDate: dueDate.value,

        priority: priority.value,

        completed: false

    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    taskInput.value = "";

    subject.value = "";

    dueDate.value = "";

    priority.value = "";

});


// ===============================
// DISPLAY TASKS
// ===============================

function displayTasks() {

    taskContainer.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.classList.add("task-card");

        li.innerHTML = `

        <div class="task-left">

            <input type="checkbox"
            ${task.completed ? "checked" : ""}>

        </div>

        <div class="task-content">

            <h3>${task.name}</h3>

            <p><strong>Subject:</strong> ${task.subject}</p>

            <p><strong>Due:</strong> ${task.dueDate}</p>

            <span class="priority ${task.priority.toLowerCase()}">

                ${task.priority}

            </span>

        </div>

        <div class="task-right">

            <button class="delete">

            <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

        const checkbox = li.querySelector("input");

        checkbox.addEventListener("change", () => {

            tasks[index].completed = checkbox.checked;

            saveTasks();

            displayTasks();

        });

        const deleteBtn = li.querySelector(".delete");

        deleteBtn.addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();

        });

        if (task.completed) {

            li.classList.add("completed");

        }

        taskContainer.appendChild(li);

    });

    updateProgress();

}



// ===============================
// UPDATE PROGRESS
// ===============================

function updateProgress() {

    let completed = tasks.filter(task => task.completed).length;

    let total = tasks.length;

    let percentage = 0;

    if (total > 0) {

        percentage = Math.round((completed / total) * 100);

    }

    progressBar.style.width = percentage + "%";

    progressText.innerHTML = percentage + "%";

}



// ===============================
// SAVE TASKS
// ===============================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}



// ===============================
// CLEAR COMPLETED
// ===============================

clearCompleted.addEventListener("click", function () {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    displayTasks();

});