const input = document.querySelector("#input input");
const tasksDiv = document.querySelector("#tasks-div");
const logo = document.querySelector("#logo");
let tasksBackup = JSON.parse(localStorage.getItem("tasks"))|| [];
tasksBackup.forEach(oneTask => createTask(oneTask));

function createTask(oneTask) {
  const taskCard = document.createElement('li');
  taskCard.classList.add('task-card');
  tasksDiv.appendChild(taskCard);

  const button = document.createElement('button');
  button.classList.add('button');
  taskCard.appendChild(button);
  button.addEventListener('click', function(){
    if (task.style.textDecoration === "none") {
      task.style.textDecoration = "line-through";
      button.classList.add('done');
    } else {
      task.style.textDecoration = "none";
      button.classList.remove('done');
    }
  });

  const task = document.createElement('p');
  task.textContent = oneTask;
  taskCard.appendChild(task);
  input.value = "";

  const deleteTask = document.createElement('div');
  deleteTask.classList.add('delete-task');
  deleteTask.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#99dbff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>'
  taskCard.appendChild(deleteTask);
  deleteTask.addEventListener('click', function(){
    taskCard.classList.add('dissapear');
    taskCard.addEventListener('animationend', function(){
      const newArray = [];
      tasksBackup.forEach(function(t){
        if (t != oneTask) {
          newArray.push(t);
        }
      });
      tasksBackup = newArray;
      localStorage.setItem("tasks", JSON.stringify(tasksBackup));
      taskCard.remove();
    });
  });
}

input.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    const value = input.value.trim();
    if (value === "") return;
    tasksBackup.push(value);
    localStorage.setItem("tasks", JSON.stringify(tasksBackup));
    createTask(value);
  }
});

logo.addEventListener('click', function(){
  location.reload();
})