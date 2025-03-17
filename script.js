const addTaskBtn = document.querySelector(".add-taskBtn");
const taskInputEl = document.querySelector(".task-input");
const tasksList = document.querySelector(".tasks-list");

let tasks = [];

function addTaskInList() {
  const task = taskInputEl.value;
  if (!task) {
    console.error("No task is provided.");
    return;
  }

  taskInputEl.value = "";

  let taskObj = {
    description: task,
    completed: false,
  };

  if (!tasks) {
    console.error("Tasks array should be initialized.");
    return;
  }

  tasks.push(taskObj);
  renderTask(tasks);
}

function renderTask(tasks) {
  // Clear existing tasks
  if (!tasksList) {
    console.error("Tasks list element is not found.");
    return;
  }
  tasksList.innerHTML = "";

  // Render new tasks
  if (!Array.isArray(tasks)) {
    console.error("Tasks should be an array.");
    return;
  }

  tasks.forEach((task, index) => {
    const { description, completed } = task;
    if (typeof description !== "string") {
      console.error("Task description should be a string.");
      return;
    }

    const taskItem = document.createElement("li");
    taskItem.className = "task";
    taskItem.setAttribute("data-index", index);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "completed";
    checkbox.className = "checkbox";

    checkbox.checked = completed;

    taskItem.appendChild(checkbox);

    const taskDescription = document.createElement("p");
    taskDescription.textContent = description;

    if (completed) {
      taskDescription.classList.add("task-completed");
    }

    taskItem.appendChild(taskDescription);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-taskBtn";
    deleteButton.setAttribute("aria-label", "Delete Task Button");

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "ri-delete-bin-5-fill";
    deleteButton.appendChild(deleteIcon);

    taskItem.appendChild(deleteButton);
    tasksList.appendChild(taskItem);
  });

  if (typeof handleCompleteAndDeleteTask === "function") {
    handleCompleteAndDeleteTask();
  } else {
    console.error("handleCompleteAndDeleteTask is not a function.");
  }
}
function handleCompleteAndDeleteTask() {
  // TODO:- Handle Complete and Delete Task

  const checkboxes = document.querySelectorAll(".checkbox");
  const deleteButtons = document.querySelectorAll(".delete-taskBtn");

  function handleCheckbox(checkbox) {
    checkbox.addEventListener("change", () => {
      const taskItem = checkbox.parentElement;
      const taskDescription = taskItem.querySelector("p");
      const taskIndex = taskItem.getAttribute("data-index");

      if (checkbox.checked) {
        taskDescription.classList.add("task-completed");

        // Update task completion status
        tasks[taskIndex].completed = checkbox.checked;

        // Move completed task to the end of the tasks array
        const completedTask = tasks.splice(taskIndex, 1);
        tasks.push(...completedTask);
      } else {
        taskDescription.classList.remove("task-completed");

        // Update task completion status
        tasks[taskIndex].completed = checkbox.checked;

        // Move to the beginning of the tasks array
        const uncompletedTask = tasks.splice(taskIndex, 1);
        tasks.unshift(...uncompletedTask);
      }

      renderTask(tasks);
    });
  }

  function handleDelete(deleteButton) {
    deleteButton.addEventListener("click", () => {
      const taskItem = deleteButton.parentElement;
      const taskIndex = taskItem.getAttribute("data-index");

      // Remove task from the DOM
      tasksList.removeChild(taskItem);

      // Remove task from tasks array
      tasks.splice(taskIndex, 1);
      renderTask(tasks);
    });
  }

  checkboxes.forEach(handleCheckbox);
  deleteButtons.forEach(handleDelete);
}

addTaskBtn.addEventListener("click", addTaskInList);
