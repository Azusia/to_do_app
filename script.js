const input = document.querySelector("#taskInput");
const button = document.querySelector("#taskBtn");
const ul = document.querySelector("#taskList");
let filter = "all";

let tasks = [];

const savedTasks = localStorage.getItem("tasks");

if (savedTasks){
    tasks = JSON.parse(savedTasks);
}

function init(){
    button.addEventListener("click", () => {

        if (input.value.trim() === ""){
           alert("Cannot add an empty field. Please try again.");
            return;
        }

       tasks.push({
           text: input.value,
           done: false
       });

       input.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            tasks.push({
                text: input.value,
                done: false
        })};
       })

       localStorage.setItem("tasks", JSON.stringify(tasks));

       renderTasks();
       input.value = "";
    });

    document.querySelector("#allBtn").addEventListener("click", () => {
        filter = "all";
        renderTasks();
    });

    document.querySelector("#activeBtn").addEventListener("click", () => {
        filter = "active";
        renderTasks();
    });

    document.querySelector("#doneBtn").addEventListener("click", () => {
        filter = "done";
        renderTasks();
    });

}

const themeBtn = document.querySelector("#themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// przy starcie:
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

function renderTasks(){
    ul.innerHTML = "";

    let filteredTasks = tasks;

    if(filter === "active"){
        filteredTasks = tasks.filter(task => !task.done);
    }

    if(filter === "done"){
        filteredTasks = tasks.filter(task => task.done);
    }

    const sortedTasks = [...filteredTasks].sort((a, b) => a.done - b.done);

    sortedTasks.forEach((task) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        checkbox.addEventListener("change", () => {
            task.done = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        if(task.done){
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        deleteBtn.addEventListener("click", () => {
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        ul.appendChild(li);
    });
}

init();
renderTasks();

input.addEventListener("keydown", (event) => {
    console.log("KEY:", event.key);
});