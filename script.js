/**
 * Task Manager with Categories & Views
 * 
 * @author Noelia Pérez Mojica
 * @version 0.3
 * @date 18/03/2026
*/

const input = document.querySelector("#input input");
const tasksDiv = document.querySelector("#tasks-div");
const logo = document.querySelector("#logo");
const ProgressBar = document.querySelector("#progress-bar");
let tasksBackup = JSON.parse(localStorage.getItem("tasks"))|| [];
tasksBackup.forEach(oneTask => createTask(oneTask));
let firstEnter = tasksBackup.length > 0;
const categories = document.querySelector("#categories");
const addTask = document.querySelector("#add-task"); 
let subjectInput = document.querySelector("#subject-input");


function TaskCardRemove(oneTask, taskCard){
  const copyArray = [];
  tasksBackup.forEach(function(t){
    if (t.text !== oneTask.text) {
      copyArray.push(t);
    }
  });
  tasksBackup = copyArray;
  localStorage.setItem("tasks", JSON.stringify(tasksBackup));
  taskCard.remove();
}

function createButton(oneTask, task) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.addEventListener('click', function() {
    oneTask.done = !oneTask.done;
    localStorage.setItem("tasks", JSON.stringify(tasksBackup));
    task.style.textDecoration = oneTask.done ? "line-through" : "none";
    button.classList.toggle('done', oneTask.done);
  });
  if (oneTask.done) button.classList.add('done');
  return button;
}

function createTaskText(oneTask) {
  const task = document.createElement('p');
  task.textContent = oneTask.text;
  if (oneTask.done) task.style.textDecoration = "line-through";
  return task;
}

function createDeleteButton(oneTask, taskCard) {
  const deleteTask = document.createElement('div');
  deleteTask.classList.add('delete-task');
  deleteTask.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#99dbff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
  deleteTask.addEventListener('click', function() {
    if (tasksBackup.length === 1) {
      ProgressBar.style.display = "none";
      firstEnter = false;
    }
    TaskCardRemove(oneTask, taskCard);
  });
  return deleteTask;
}

function createTask(oneTask) {
  if (oneTask.text.trim() === "") return;

  const taskCard = document.createElement('li');
  taskCard.classList.add('task-card');

  const task = createTaskText(oneTask);
  const button = createButton(oneTask,task);
  const deleteTask = createDeleteButton(oneTask, taskCard);

  taskCard.appendChild(button);
  taskCard.appendChild(task);
  taskCard.appendChild(deleteTask);
  tasksDiv.appendChild(taskCard);
}

if (firstEnter) {
  ProgressBar.style.display = "flex";
}
input.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    const value = input.value.trim();
    if (value === "") return;
    const valueBool = {text: value, done: false};
    tasksBackup.push(valueBool);
    localStorage.setItem("tasks", JSON.stringify(tasksBackup));
    createTask(valueBool);
    input.value = "";
    if(!firstEnter) {
      ProgressBar.style.display = "flex";
    }
    firstEnter = true;
  }
});

logo.addEventListener('click', function(){
  location.reload();
});

let isClicked = false;
addTask.addEventListener('click', function(){
  if (!isClicked) {
    subjectInput.style.display = "flex";
    isClicked = !isClicked;
  } else {
    subjectInput.style.display = "none";
    isClicked = !isClicked;
  }
}); 