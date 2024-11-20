// Selectors
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const pendingTaskList = document.getElementById('pendingTaskList');
const completedTaskList = document.getElementById('completedTaskList');

// Add Task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    createTask(taskText, pendingTaskList);
    taskInput.value = '';
  }
});

// Create Task Item
function createTask(taskText, targetList) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.innerHTML = `
    <span>${taskText}</span>
    <div class="actions">
      <button class="edit" onclick="editTask(this)">Edit</button>
      <button class="complete" onclick="toggleComplete(this)">Complete</button>
      <button class="delete" onclick="deleteTask(this)">Delete</button>
    </div>
  `;
  targetList.appendChild(li);

  // Add animation
  setTimeout(() => li.classList.add('show'), 10);
}

// Edit Task
function editTask(button) {
  const taskItem = button.parentElement.parentElement;
  const taskText = taskItem.querySelector('span');
  const newText = prompt('Edit your task:', taskText.textContent);
  if (newText) taskText.textContent = newText;
}

// Delete Task
function deleteTask(button) {
  const taskItem = button.parentElement.parentElement;
  taskItem.classList.remove('show');
  setTimeout(() => taskItem.remove(), 300); // Matches animation duration
}

// Toggle Complete
function toggleComplete(button) {
  const taskItem = button.parentElement.parentElement;
  const targetList =
    taskItem.parentElement.id === 'pendingTaskList'
      ? completedTaskList
      : pendingTaskList;

  // Toggle completed class
  taskItem.querySelector('span').classList.toggle('completed');
  button.textContent =
    button.textContent === 'Complete' ? 'Undo' : 'Complete';

  // Move to the other list
  targetList.appendChild(taskItem);
}
