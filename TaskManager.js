import Task from "./Task.js";

class TaskManager {
  constructor(text, btn, activeBlock, completedBlock) {
    this.listItems = this.loadFromStorage();
    this.taskDeskElemInput = text;
    this.addTaskBtn = btn;
    this.activeBlock = activeBlock;
    this.completedBlock = completedBlock;

    this.init();
  }

  init() {
    this.addTaskBtn.addEventListener("click", this.addTask.bind(this), false);
    this.draw();
  }

  addTask() {
    const newTask = new Task(
      this.listItems.length + 1,
      this.taskDeskElemInput.value,
      false,
      this.draw.bind(this),
      this.onEditTask.bind(this),
      this.onRemoveTask.bind(this)
    );
    this.listItems.push(newTask);

    this.taskDeskElemInput.value = "";
    this.draw();
  }

  onEditTask() {
    this.saveInStorage();
    this.draw();
  }

  onRemoveTask(id) {
    this.listItems = this.listItems.filter((i) => {
      return i.id !== id;
    });
    this.saveInStorage();
    this.draw();
  }

  saveInStorage() {
    try {
      localStorage.setItem("list-items", JSON.stringify(this.listItems));
    } catch (err) {}
  }

  loadFromStorage() {
    try {
      const data = JSON.parse(localStorage.getItem("list-items")) || [];
      return data.map((i) => {
        return new Task(
          i.id,
          i.desc,
          i.completed,
          this.draw.bind(this),
          this.onEditTask.bind(this),
          this.onRemoveTask.bind(this)
        );
      });
    } catch (err) {
      return [];
    }
  }

  draw() {
    //reset the ui lists
    this.activeBlock.innerHTML = "";
    this.completedBlock.innerHTML = "";

    // active items
    const activeItems = this.listItems.filter((a) => {
      return !a.completed;
    });
    // completed items
    const completedItems = this.listItems.filter((a) => {
      return a.completed;
    });

    activeItems.forEach((i) => {
      this.activeBlock.appendChild(i.renderTask());
    });

    completedItems.forEach((i) => {
      this.completedBlock.appendChild(i.renderTask());
    });

    this.saveInStorage();
  }
}
export default TaskManager;
