/**
 * Task Manager with Categories & Views
 * 
 * @author Noelia Pérez Mojica
 * @version 0.4
 * @date 16/05/2026
*/

const input = document.querySelector("#input input");
const tasksDiv = document.querySelector("#tasks-div");
const logo = document.querySelector("#logo");
const ProgressBar = document.querySelector("#progress-bar");
const clearTasks = document.querySelector("#clear-tasks");
let tasksBackup = JSON.parse(localStorage.getItem("tasks")) || [];
tasksBackup.forEach(oneTask => createTask(oneTask));
let firstEnter = tasksBackup.length > 0; //Boolean if there are tasks = true, else false
const categories = document.querySelector("#categories");
const addSubject = document.querySelector("#add-task"); 
let subjectInput = document.querySelector("#subject-input");
let nameSubject = document.querySelector("#name-subject");
let subjectsList = document.querySelector("#subjects-list");
let subjectsBackup = JSON.parse(localStorage.getItem("subjects")) || [];
subjectsBackup.forEach(oneSubject => createSubject(oneSubject));
let subjectBubble = document.querySelector(".subject-bubble");
// Windows to link a subject to a task
let chooseSubject = document.querySelector("#choose-subject");

/**
 * Deletes a task and updates localStorage
 */
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


/**
 * Creates the dynamic element "button"
 * This button handles wether a tasks has been completed
 */
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


/**
 * Creates the dynamic element text of the taskCard
 */
function createTaskText(oneTask) {
  const task = document.createElement('p');
  task.textContent = oneTask.text;
  if (oneTask.done) task.style.textDecoration = "line-through";
  return task;
}


/**
 * Creates a dynamic element delete button
 * Used with an eventListener, that calls TaskCardRemove
 */
function createDeleteButton(oneTask, taskCard) {
  const deleteTask = document.createElement('div');
  deleteTask.classList.add('delete-task');
  deleteTask.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#52a5d1"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>'
  deleteTask.addEventListener('click', function() {
    if (tasksBackup.length === 1) {
      ProgressBar.style.display = "none";
      clearTasks.style.display = "none";
      firstEnter = false;
    }
    TaskCardRemove(oneTask, taskCard);
  });
  return deleteTask;
}

/**
 * Assigns the subjects in bubbles to a task, by cliking edit svg
*/
function assignSubject(item, taskCard, subject, oneTask) {
  // Link categories to the tasks
  item.addEventListener('click', function(){
    // Create the bubble of the task, will be next to the text
    let bubbleInTask = taskCard.querySelector('.bubble-in-task');
    // Assure it doesn't exists or create it
    if (!bubbleInTask) {
      bubbleInTask = document.createElement('div');
      bubbleInTask.classList.add('bubble-in-task');
      const taskText = taskCard.querySelector('p');
      taskText.insertAdjacentElement('afterend', bubbleInTask);
    }
    // Update it with new text
    bubbleInTask.textContent = subject;
    // Update localStorage of task with subject
    const task = tasksBackup.find(t => t.text === oneTask.text);
    task.subject = subject;
    localStorage.setItem("tasks", JSON.stringify(tasksBackup));
  });
}

/**
 * Creates bubbles of subjects inside windows of edit svg
 * and then allows linking one bubble to a task
*/
function createBubble(categoriesList, taskCard, oneTask) {
  subjectsBackup.forEach(subject => {
    const item = document.createElement('div');
    item.classList.add('subject-in-list');
    const itemText = document.createElement('p');
    itemText.textContent = subject;
    item.appendChild(itemText);
    categoriesList.appendChild(item);
    assignSubject(item, taskCard, subject, oneTask);
  });
  chooseSubject.appendChild(categoriesList);
}

/**
 * Open the windows, then creates de subjects bubbles,
 * and allows linking one to a task
 * 
 * Uses pencil svg
 * Then it's saved in localStorage
 */
function categorizeCard(oneTask, taskCard) {
  const editTask = document.createElement('div');
  editTask.classList.add("edit-card");
  editTask.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#52a5d1"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg>'
  editTask.addEventListener('click', function(){
    event.stopPropagation();
    // Behavior to open the window if pencil is clicked
    // And close it if pencil is clicked
    if (chooseSubject.style.display === "flex") {
      chooseSubject.style.display = "none";
      chooseSubject.innerHTML = "";
      return;
    }
    
    // Show windows to choose a subject and reset it
    chooseSubject.style.display = "flex";
    chooseSubject.innerHTML = "";
    // Create the list of subjects inside, with text
    let categoriesList = document.createElement('li');
    categoriesList.classList.add('list-select-subject');

    createBubble(categoriesList, taskCard, oneTask);
  });
  return editTask;
}


/**
 * Creates a new task, and its buttons (text, add a subject, close, completed)
*/
function createTask(oneTask) {
  if (oneTask.text.trim() === "") return;

  const taskCard = document.createElement('li');
  taskCard.classList.add('task-card');
  
  const task = createTaskText(oneTask);
  const button = createButton(oneTask,task);
  const deleteTask = createDeleteButton(oneTask, taskCard);
  const editTask = categorizeCard(oneTask, taskCard);
  
  taskCard.appendChild(button);
  taskCard.appendChild(task);
  if (oneTask.subject) {
    let tempSubject = document.createElement('div');
    tempSubject.textContent = oneTask.subject;
    tempSubject.classList.add('bubble-in-task');
    taskCard.appendChild(tempSubject);
  }
  taskCard.appendChild(editTask);
  taskCard.appendChild(deleteTask);
  tasksDiv.appendChild(taskCard);
}


/**
 * If it's true that exists tasks (on localStorage) the progress bar is uploaded
 * USEFUL when the page is reloaded, or NOT OPENED fot the first time
*/
if (firstEnter) {
  ProgressBar.style.display = "flex";
  clearTasks.style.display = "flex";
}


/**
 * We write our task and it listens when we press "enter"
 * The input is extracted and added to localStorage, then the task is created
*/
input.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    const value = input.value.trim();
    if (value === "") return;
    const valueBool = {text: value, done: false};
    tasksBackup.push(valueBool);
    localStorage.setItem("tasks", JSON.stringify(tasksBackup));
    createTask(valueBool);
    input.value = "";
    // There aren't any task, so progress bar is not showed until now
    // USEFUL when we create the first task
    // let firstEnter = tasksBackup.length > 0; Then is false right now
    if(!firstEnter) {
      ProgressBar.style.display = "flex";
      clearTasks.style.display = "flex";
    }
    // Uploaded, for reload procedure
    firstEnter = true;
  }
});


/**
 * If the plus icon is clicked, it will open the window for input a new subject
 */
let isClicked = false;
addSubject.addEventListener('click', function(){
  event.stopPropagation();
  if (!isClicked) {
    subjectInput.style.display = "flex";
    isClicked = !isClicked;
  } else {
    subjectInput.style.display = "none";
    isClicked = !isClicked;
  }
});


/**
 * If the cross icon is clicked, deletes its bubble
*/
function deleteSubject(icons, subjectBubble, subjectValue) {
  icons.querySelector('.delete-bubble').addEventListener('click', function(){
    let auxArray = [];
    subjectsBackup.forEach(function(s) {
      if (s !== subjectValue) {
        auxArray.push(s);
      }
    });
    subjectsBackup = auxArray;
    localStorage.setItem("subjects", JSON.stringify(subjectsBackup));
    subjectBubble.remove();
  });
}

/**
 * Creates the list of subjects
 * Each subjectBubble, has a text, and icons
 * Two incons: close and edit
*/

function createSubject(subjectValue) {
  const subjectBubble = document.createElement('li');
  subjectBubble.classList.add('subject-bubble');
  
  const text = document.createElement('span');
  subjectBubble.textContent = subjectValue;
  
  const icons = document.createElement('div');
  icons.classList.add('bubble-icons');
  icons.innerHTML = `
  <svg class="edit-bubble" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z"/></svg>
  <svg class="delete-bubble" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
  `;
  deleteSubject(icons, subjectBubble, subjectValue);
  
  subjectBubble.appendChild(text);
  subjectBubble.appendChild(icons);
  subjectsList.appendChild(subjectBubble);
}


/**
 * Process the name of the subject that comes from input,
 * creates a bubble for it, and uploads it to localStorage
*/
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


/**
 * If we click the logo, reload the website
*/
logo.addEventListener('click', function(){
  location.reload();
});


/**
 * Click outside the window close it
 * Window that declares a new subject
*/
document.addEventListener('click', function(event) {
  if (!subjectInput.contains(event.target)) {
    subjectInput.style.display = "none";
    // Delete previous list, so it doesn't repeat
  }
});


/**
 * Click outside the window close it
 * Window that choose the subject
*/
document.addEventListener('click', function(event) {
  if (!chooseSubject.contains(event.target)) {
    chooseSubject.style.display = "none";
    // Delete previous list, so it doesn't repeat
    chooseSubject.innerHTML = "";
  }
});

/**
 * Clear all tasks, also from local storage
*/
clearTasks.addEventListener('click', function() {
  tasksBackup = [];
  firstEnter = false;
  localStorage.removeItem("tasks");
  tasksDiv.innerHTML = "";
  ProgressBar.style.display = "none";
  clearTasks.style.display = "none";
});