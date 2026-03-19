const input = document.querySelector("#input input");
const tasksDiv = document.querySelector("#tasks-div");


function createTask() {
  const taskCard = document.createElement('div');
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
  task.textContent = input.value;
  taskCard.appendChild(task);
  input.value = "";

  const deleteTask = document.createElement('div');
  deleteTask.classList.add('delete-task');
  deleteTask.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#99dbff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>'
  taskCard.appendChild(deleteTask);
  deleteTask.addEventListener('click', function(){
    taskCard.classList.add('dissapear');
    taskCard.addEventListener('animationend', function(){
      taskCard.remove();
    });
  });
}

input.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    createTask();
  }
});