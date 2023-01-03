import TaskManager from "./TaskManager.js";
window.addEventListener(
  "load",
  () => {
    const taskManager = new TaskManager(
      document.getElementById("task-main-text"),
      document.getElementById("task-main-btn"),
      document.getElementById("active-items"),
      document.getElementById("completed-items")
    );
  },
  false
);
