// Define UI Vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

function loadEventListeners() {
  // Add task Event
  form.addEventListener('submit', addTask)
  // Remove task list
  taskList.addEventListener('click', removeTask)
  // Clear Task Events
  clearBtn.addEventListener('click', clearTasks)
  // Filter tasks Events
  filter.addEventListener('keyup', filterTasks)
}

// Add Task

function addTask(e) {
  if (taskInput.value === '') {
    alert('add a task!')
  }
  // Create li element
  const li = document.createElement('li')
  // Add class
  li.className = 'collection-item'
  // Create text node 
  li.appendChild(document.createTextNode(taskInput.value))
  // Create new link
  const link = document.createElement('a')
  // Add class
  link.className = 'delete-item secondary-content'
  // Add icon
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // Append the link to the LI
  li.appendChild(link)
  // Append the li to the ul
  taskList.appendChild(li)
  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value)
  // Clear the input
  taskInput.value = ''


  e.preventDefault()
}

// Store Task

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()
    }

  }
  e.preventDefault()
}


// Clear tasks

function clearTasks() {
  // Option 1
  // taskList.innerHTML = ''

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)

  }
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach
    (function (task) {
      const item = task.firstChild.textContent
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = "block"
      } else {
        task.style.display = "none"
      }
    })
}