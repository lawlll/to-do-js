// multiple select complete
// drag button
// edit placeholder to display "task $index-of-task" after every modification to the list

let thisHour = new Date().getHours();
let greetingText, greetingIconClass;

if (thisHour >= 6 && thisHour < 12) {
  greetingText = "Good Morning";
  greetingIconClass = "bi-brightness-alt-high";
} else if (thisHour >= 12 && thisHour < 18) {
  greetingText = "Good Afternoon";
  greetingIconClass = "bi-brightness-high";
} else if (thisHour >= 18 && thisHour < 20) {
  greetingText = "Good Evening";
  greetingIconClass = "bi-brightness-alt-high";
} else {
  greetingText = "Good Night";
  greetingIconClass = "bi-moon-stars";
}

const greetingTextEl = document.getElementById("greetingText");
const greetingIconEl = document.getElementById("greetingIcon");

greetingTextEl.innerHTML = greetingText;
greetingIconEl.classList.add(greetingIconClass);

function loadSavedTasks() {
  const savedTasksJSON = localStorage.getItem("tasks");
  if (savedTasksJSON) {
    const savedTasks = JSON.parse(savedTasksJSON);

    const taskList = document.getElementById("taskList");
    for (const savedTask of savedTasks) {
      const taskItem = document.createElement("li");
      const taskLabel = document.createElement("label");
      taskLabel.textContent = savedTask.text;

      const taskCheckbox = document.createElement("input");
      taskCheckbox.type = "checkbox";
      taskCheckbox.checked = savedTask.checked;
      taskCheckbox.onchange = () => {
        updateTaskStyle(taskLabel, taskCheckbox.checked);
        // heroSave(); // Save when checkbox state changes
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        if (confirm("delete this task?")) {
          taskList.removeChild(taskItem);
          // heroSave(); // Save after deleting a task
        }
      };

      taskItem.appendChild(taskCheckbox);
      taskItem.appendChild(taskLabel);
      taskItem.appendChild(deleteBtn);
      taskList.appendChild(taskItem);

      updateTaskStyle(taskLabel, savedTask.checked);
    }
  }
}

function addTask() {
  const taskInput = document.getElementById("newTaskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
    /*The trim() method removes whitespace from both sides of a string.
    The trim() method does not change the original string. */
    const taskText = taskInput.value;
    const taskItem = document.createElement("li");

    const taskLabel = document.createElement("label");
    taskLabel.textContent = taskText;

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.onchange = () => {
      updateTaskStyle(taskLabel, taskCheckbox.checked);
    };
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      if (confirm("sure you wanna delete it?")) {
        taskList.removeChild(taskItem);
      }
    };

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    taskInput.value = "";
  }
}

function updateTaskStyle(taskItem, isChecked) {
  if (isChecked) {
    taskItem.style.textDecoration = "line-through";
  } else {
    taskItem.style.textDecoration = "none";
  }
}

function checkAll() {
  const taskList = document.getElementById("taskList");
  const tasks = taskList.getElementsByTagName("li");

  for (const taskItem of tasks) {
    const taskLabel = taskItem.querySelector("label");
    const checkbox = taskItem.querySelector("input[type='checkbox']");
    checkbox.checked = true;
    updateTaskStyle(taskLabel, true);
  }
}

function uncheckAll() {
  const taskList = document.getElementById("taskList");
  const tasks = taskList.getElementsByTagName("li");

  for (const taskItem of tasks) {
    const taskLabel = taskItem.querySelector("label");
    const checkbox = taskItem.querySelector("input[type='checkbox']");
    checkbox.checked = false;
    updateTaskStyle(taskLabel, false);
  }
}

function deleteAll() {
  const taskList = document.getElementById("taskList");
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

function heroSave() {
  const taskList = document.getElementById("taskList");
  const tasks = taskList.getElementsByTagName("li");

  const savedTasks = [];

  for (const taskItem of tasks) {
    const taskLabel = taskItem.querySelector("label");
    const checkbox = taskItem.querySelector("input[type='checkbox']");
    const taskText = taskLabel.textContent;
    const isChecked = checkbox.checked;

    savedTasks.push({ text: taskText, checked: isChecked });
  }

  // Save the tasks array to localStorage as JSON string
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

document.addEventListener("DOMContentLoaded", function () {
  loadSavedTasks();
});

//enter to add task

const newTaskInput = document.getElementById("newTaskInput");
newTaskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});
