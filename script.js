let taskList = [];
let isVisible = false;
let isFilterVisible = false;

const btnToogle = document.getElementById("toggleTasks");
const addBtn = document.getElementById("Add-Task");
const btnFilter = document.getElementById("Priority-filter");

const eyeIcon = document.getElementById("eyeIcon");
const textVisibility = document.getElementById("Text-visibility");
const incorrectmsg = document.getElementById("Incorrect");

const container = document.getElementById("Taskcontainer");
const menuFilter = document.getElementById("FilterMenu");

const taskSection = document.getElementById("Modal-Wrapper");

function testForm() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value;

    
    if (title === "" || description === "" || priority === "") {
        if(incorrectmsg){
            incorrectmsg.style.color = "red";
            incorrectmsg.textContent = "You can't the form empty"

            setTimeout(() => {
                incorrectmsg.textContent = "";
            },2000)

            document.getElementById("formTask").reset();
        }
        return false;
    }

    return true;
}



function loadTask(){
    const saved = localStorage.getItem("Current_Tasks")
    if(saved){
        taskList = JSON.parse(saved)
        renderTasks();
    }
};

function saveTasks(){
    localStorage.setItem("Current_Tasks" , JSON.stringify(taskList));
    console.log("synchronization complete");
}

function renderTasks(){
    container.innerHTML = "";
    taskList.forEach((task, index) => {
        taskUI(task, index)
    });
}

if(addBtn){

    const toggleTask = () => {
        if(taskSection){
            taskSection.style.display = "flex" ;
        }
    };

    addBtn.addEventListener("click", toggleTask)
}

function closeModal(){
    taskSection.style.display = "none";
}

function addTask(event) {
    if(event) event.preventDefault();

    if (!testForm()) {
    console.warn("Form is empty or invalid");
    return;
    }

    const task ={
        id: Date.now(),
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value
    };

    taskList.push(task);
    saveTasks()
    renderTasks()
    console.log(taskList);

    textVisibility.textContent = "Hide tasks";
    
    taskUI(task);

    sort("All");

    closeModal();
    
    taskSection.style.display = "none";
    document.getElementById("formTask").reset();
    return false;
}

function taskUI(task, index) {
    const container = document.getElementById("Taskcontainer");
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-3 task-col";
    card.dataset.priority = task.priority;

    card.innerHTML = `
        <article class="task-card">
            <h3 class="fw-bold border-bottom pb-2">${task.title}</h3>
            <p class="flex-grow-1 small text-muted">${task.description}</p>
            <span class="priority-tag priority-${task.priority}">${task.priority}</span>
            <div class="mt-2">
                <label for="status-${task.id}" class="small fw-bold">Status:</label>
                <select id="status-${task.id}" class="form-select py-3 form-select-sm mt-1 dataFormTask">
                    <option value='pending'>Pending</option>
                    <option value='process'>In process</option>
                    <option value='complete'>Complete</option>
                </select>
                <button class="mt-3 btn btn-add" onclick="deleteTask(${index})"><i class="bi bi-trash me-1"></i>Delete</button>
            </div>
        </article>
    `;

    const taskValue = card.querySelector(".dataFormTask")
    taskValue.addEventListener("change", (e) =>{
        if(e.target.value === 'complete'){

            card.style.opacity = "0";
            card.style.transform = "scale(0.9)";
            card.style.transition = "0.3s all ease-in-out";

            setTimeout(() =>{
                deleteTask();
            }, 200)
            
        }
    });

    container.appendChild(card);
}

function deleteTask(index){
    taskList.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTasks() {
    isVisible = !isVisible;

    if (isVisible) {
        textVisibility.textContent = "Hide tasks";
        btnToogle.classList.add("active");
        eyeIcon.className = "bi bi-eye-slash me-2";
        container.style.display = "none";
    } else {
        textVisibility.textContent = "Show tasks";
        btnToogle.classList.remove("active");
        eyeIcon.className = "bi bi-eye me-2";
        container.style.display = "flex";
    }
}

if (btnToogle) {
    btnToogle.addEventListener("click", toggleTasks);
}

function filterWiew() {
    isFilterVisible = !isFilterVisible;

    if (isFilterVisible) {
        if (btnFilter) btnFilter.classList.add("active");
        if (menuFilter) menuFilter.style.display = "block";
    } else {
        if (btnFilter) btnFilter.classList.remove("active");
        if (menuFilter) menuFilter.style.display = "none";
    }
}

if (btnFilter) {
    btnFilter.addEventListener("click", (e) => {
        e.stopPropagation();
        filterWiew();
    });
}

document.addEventListener("click", () => {
    if (isFilterVisible) {
        isFilterVisible = false;
        if (menuFilter) menuFilter.style.display = "none";
        if (btnFilter) btnFilter.classList.remove("active");
    }
});

function sort(selection) {
    renderTasks();
    const allCards = document.querySelectorAll(".task-col");
    const displayLabel = document.getElementById("selectedFilter");
    
    allCards.forEach(card => {
        const cardPriority = card.dataset.priority;
        if (selection === "All" || cardPriority === selection) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
    
    if (displayLabel) {
        displayLabel.textContent = selection === "All" ? "Filter" : selection;
    }
}   

window.onload = loadTask;