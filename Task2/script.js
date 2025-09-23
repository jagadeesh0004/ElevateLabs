document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById("addBtn");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));

  function renderTask(text, completed = false) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;
    if (completed) li.classList.add("completed");
    li.appendChild(span);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.type = 'button';
    removeBtn.textContent = 'X';
    li.appendChild(removeBtn);

    taskList.appendChild(li);
  }

  function saveTasks() {
    const allTasks = [];
    taskList.querySelectorAll("li").forEach(li => {
      allTasks.push({
        text: li.querySelector(".task-text").textContent,
        completed: li.classList.contains("completed")
      });
    });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }

  function addTask() {
    const txt = taskInput.value.trim();
    if (!txt) return;
    renderTask(txt);
    saveTasks();
    taskInput.value = "";
    taskInput.focus();
  }

  addBtn.addEventListener('click', addTask);

  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });

  taskList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('remove-btn')) {
      li.remove();
      saveTasks();
      return;
    }
    li.classList.toggle('completed');
    saveTasks();
  });
});
