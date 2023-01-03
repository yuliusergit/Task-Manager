class Task {
  constructor(id, desc, status, onRefresh, onEdit, onRemove) {
    this.id = id;
    this.desc = desc;
    this.completed = status || false;
    this.refreshList = onRefresh || (() => {});
    this.onEdit = onEdit || (() => {});
    this.onRemove = onRemove || (() => {});
  }
  renderTask() {
    const group = document.createElement("div");
    group.className = "input-group";

    const input = document.createElement("input");
    input.value = this.desc;
    input.type = "text";
    input.className = "form-control";
    input.placeholder = "Task text";

    group.appendChild(input);

    // create action btns
    const statusToggleBtn = this.createBtn(
      1,
      "check",
      this.toggleStatus.bind(this)
    );
    const editToggleBtn = this.createBtn(1, "pencil", () => {
      this.desc = input.value;
      this.onEdit(this.desc);
    });
    const removeToggleBtn = this.createBtn(1, "trash", this.remove.bind(this));

    if (!this.completed) {
      group.appendChild(statusToggleBtn);
      group.appendChild(editToggleBtn);
    }
    group.appendChild(removeToggleBtn);

    return group;
  }

  toggleStatus() {
    this.completed = true;
    this.refreshList();
  }

  setText() {
    this.desc = true;
    this.refreshList();
  }

  remove() {
    this.onRemove(this.id);
  }

  createBtn(id, iconName, onClick) {
    const btn = document.createElement("btn");
    btn.className = `btn btn-outline-secondary bg-warning`;
    btn.id = `task-${id}`;
    btn.addEventListener("click", onClick, false);

    const icon = document.createElement("i");
    icon.className = `fa-solid fa-${iconName}`;

    btn.appendChild(icon);

    return btn;
  }
}
export default Task;
