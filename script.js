const input = document.querySelector("#input input");
const tasksDiv = document.querySelector("#tasks-div");
const logo = document.querySelector("#logo");
let tasksBackup = JSON.parse(localStorage.getItem("tasks"))|| [];
tasksBackup.forEach(oneTask => createTask(oneTask));

function createTask(oneTask) {
  if (oneTask.text.trim() === "") return;
  const taskCard = document.createElement('li');
  taskCard.classList.add('task-card');
  tasksDiv.appendChild(taskCard);

  const button = document.createElement('button');
  button.classList.add('button');
  button.addEventListener('click', function(){
    oneTask.done = !oneTask.done;
    localStorage.setItem("tasks", JSON.stringify(tasksBackup));
    if (oneTask.done) {
      task.style.textDecoration = "line-through";
      button.classList.add('done');
    } else {
      task.style.textDecoration = "none";
      button.classList.remove('done');
    }
  });
  taskCard.appendChild(button);

  const task = document.createElement('p');
  task.textContent = oneTask.text;
  taskCard.appendChild(task);

  if(oneTask.done) {
    task.style.textDecoration = "line-through";
    button.classList.add('done');
  }

  const deleteTask = document.createElement('div');
  deleteTask.classList.add('delete-task');
  deleteTask.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#99dbff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>'
  deleteTask.addEventListener('click', function(){
    taskCard.classList.add('dissapear');
    taskCard.addEventListener('animationend', function(){
      const copyArray = [];
      tasksBackup.forEach(function(t){
        if (t.text !== oneTask.text) {
          copyArray.push(t);
        }
      });
      tasksBackup = copyArray;
      localStorage.setItem("tasks", JSON.stringify(tasksBackup));
      taskCard.remove();
    });
  });
  taskCard.appendChild(deleteTask);
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
  }
});

logo.addEventListener('click', function(){
  location.reload();
})