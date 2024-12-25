const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = ''; 
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.classList.add('todo-text');
    if (todo.completed) {
      span.classList.add('completed');
    }
    li.appendChild(span);

    const completeBtn = document.createElement('span');
    completeBtn.textContent = '✔';
    completeBtn.classList.add('todo-complete');
    completeBtn.onclick = () => toggleComplete(index);
    li.appendChild(completeBtn);

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '🗑';
    deleteBtn.classList.add('todo-delete');
    deleteBtn.onclick = () => deleteTask(index);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

function addTask() {
  const text = input.value.trim();
  if (text === '') return;

  todos.push({ text, completed: false });
  input.value = '';
  saveTodos();
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTask(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

renderTodos();
