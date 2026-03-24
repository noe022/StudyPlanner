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
let tasksBackup = JSON.parse(localStorage.getItem("tasks")) || [];
tasksBackup.forEach(oneTask => createTask(oneTask));
let firstEnter = tasksBackup.length > 0;
const categories = document.querySelector("#categories");
const addTask = document.querySelector("#add-task"); 
let subjectInput = document.querySelector("#subject-input");
let nameSubject = document.querySelector("#name-subject");
let subjectsList = document.querySelector("#subjects-list");
let subjectsBackup = JSON.parse(localStorage.getItem("subjects")) || [];
subjectsBackup.forEach(oneSubject => createSubject(oneSubject));
let subjectBubble = document.querySelector(".subject-bubble");

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

function createSubject(subjectValue) {
  const subjectBubble = document.createElement('li');
  subjectBubble.classList.add('subject-bubble');

  const text = document.createElement('span');
  subjectBubble.textContent = subjectValue;

  const icons = document.createElement('div');
  icons.classList.add('bubble-icons');
  icons.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg>
  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
  `;
  subjectBubble.appendChild(text);
  subjectBubble.appendChild(icons);
  subjectsList.appendChild(subjectBubble);
}

nameSubject.addEventListener('keydown', function(event){
  if (event.key === 'Enter') {
    const subjectValue = nameSubject.value;
    if (subjectValue == "") return;
    createSubject(subjectValue);
    subjectsBackup.push(subjectValue);
    localStorage.setItem("subjects", JSON.stringify(subjectsBackup));
    nameSubject.value = "";
  }
});

logo.addEventListener('click', function(){
  location.reload();
});