const createTaskBtn = document.getElementById('createtask');
const modal = document.getElementById('container');
const cancelBtn = document.getElementById('cancel');
const addTaskBtn = document.getElementById('addtask');
const taskList = document.getElementById('tasklist');
const overlay = document.getElementById('body-overlay');
let deleteAlltask = document.getElementById('deleteall');
let taskcounter = document.getElementById('task-counter');
let searchInput = document.getElementById('searchbox');
let filtered = document.getElementById('filter');
let Sidenav = document.getElementById('sidenav');
let Manubar = document.getElementById('bars');
let headerText = document.getElementById('header-text');
let bodylayout = document.getElementById('layout');
let Notask_Model = document.getElementById('Notask-Model');
let Notask_btn = document.getElementById('no-taskbtn');
let toast = document.getElementById('toast');
const titleInput = document.getElementById('tasktitle');
const descInput = document.getElementById('description');
const dateInput = document.getElementById('dateinput');
const priorityInput = document.getElementById('priority');
const tagInput = document.getElementById('taginput');
let allTask = document.getElementById('Alltask');
let pendingTask = document.getElementById('pendingtask');
let compTask = document.getElementById('completedtask');
let high_priority = document.getElementById('high-priority');
let medium_priority = document.getElementById('medium-priority');
let low_priority = document.getElementById('low-priority');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let opennav = false;
let currentFilter = 'all';
let current_priority = '';
let edittask = null;
function openModal() {
  modal.style.display = 'block';
  overlay.style.display = 'block';
}
function closeModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
 clearInput()
 edittask = null;
 addTaskBtn.textContent='Add Task'

}
function addTask() {
  if(!titleInput.value){
    ShowErr("Task title is required!")
    return;
  }

    if(edittask !==null){
    let task = tasks.find((i)=>i.id ===edittask)
    task.title = titleInput.value;
    task.desc = descInput.value;
    task.date = dateInput.value;
    task.priority = priorityInput.value.toLowerCase();
    task.tag = tagInput.value;

    edittask = null;
    addTaskBtn.textContent='Add Task'
   
    refreshUi()
    closeModal();
showtoast("Task updated successfully!","green")

  
   

    
  }
 

  else {

  const task = {
    title: titleInput.value,
    completed: false,
    desc: descInput.value,
    date: dateInput.value,
    priority: priorityInput.value.toLowerCase(),
    tag: tagInput.value,
    id: Date.now(),

  };



  tasks.push(task);
 
  
  clearInput()
   updateEmptyState(tasks)
 refreshUi()
 

  closeModal();
showtoast("Task added successfully!","green")
}








}
function removeTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
 
  showtoast("Task removed successfully!","crimson")
    

  updateEmptyState(tasks,"No tasks yet","Add your first task to get started.")

  
  
  
  
refreshUi()


}
function removeAlltask(task) {

  if(tasks.length === 0){
      return;
  }
  
   
  else {
  tasks = []
  
  showtoast("All tasks removed!","crimson")
  updateEmptyState(tasks,"No tasks yet","Add your first task to get started.")
 refreshUi()


  }

}
function completeTask(id) {
  let task = tasks.find((t) => t.id === id);
  if (task) {
    if (task.completed === false) {
      task.completed = true;
     showtoast("Task marked as completed!","green")
    }
    else {
      task.completed = false;
    }
  }
  refreshUi()





}
function EditTask(id) {

   let task = tasks.find((i) => i.id === id);
   if(!task) return;
    titleInput.value = task.title;
     descInput.value = task.desc;
      dateInput.value = task.date;
       priorityInput.value = task.priority;
        tagInput.value = task.tag; 
        edittask = id;
         
         addTaskBtn.textContent='Update Task';
          openModal();
  }
function renderTasks(data = tasks) {
  const html = data.map((task) => {
    return `
        <div class="task-card">
          <div onClick='completeTask(${task.id})' class="task-check">

          ${task.completed ? '<i class="ri-checkbox-circle-fill"></i>' : '<i class="ri-circle-line"></i>'}
            
          </div>
          <div class="task-info">
            <div class="task-details">
              <p class="task-title ${task.completed ? 'done' : ''}">
              ${task.title}
              </p>
              <p class="task-desc">${task.desc}</p> 
              <div class="task-meta">
                <span class="task-priority">${task.priority}</span>
                <span class="task-tag">${task.tag}</span>
                <span class="task-date">${task.date}</span>
              </div>
            </div>
            <div class="task-btns">
              <button onClick='EditTask(${task.id})'> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9.5 2l2.5 2.5L4.5 12H2v-2.5L9.5 2z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg></button>
              <button onclick="removeTask(${task.id})">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 3.5h10M5.5 3.5V2.5h3v1M5.5 6v4M8.5 6v4M3 3.5l.7 8h6.6l.7-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
  });

  taskList.innerHTML = html.join('');

}
function filtering() {
  let result = [...tasks];
  let inputvalue = searchInput.value;
  let value =filtered.value;

  if (currentFilter === 'pending') {
    result = result.filter((task) => !task.completed);



  }
  if (currentFilter === 'Completed') {
    result = result.filter((task) => task.completed);
  
  }

  if (current_priority) {
    result = result.filter((i) => i.priority === current_priority);
    
  }

  if(inputvalue){
   result = result.filter(task =>
  task.title.toLowerCase().includes(inputvalue.toLowerCase().trim())
);
    
  }
  
 

  if (value === 'newestfirst') {
    result.sort((a, b) => b.id - a.id);

  }

  else if (value === 'oldestfirst') {
    result.sort((a, b) => a.id - b.id)
  }
  else if (value === 'duedate') {
    result.sort((a, b) => new Date(a.date) - new Date(b.date))
  } 




  else if (value === 'duedateDesc') {
    result.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  else if (value === 'A-Z') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }
  else if (value === 'Z-A') {
    result.sort((a, b) => b.title.localeCompare(a.title));
  }


      updateEmptyState(result,"No matching tasks","Try another search.");

    
 renderTasks(result);


}
function refreshUi(){
  saveData();
  updateCounter();
  filtering();

}
function HeaderText(Text) {
  headerText.innerText = Text;
}
function updateCounter() {
  let all = tasks.length;
  let completed = tasks.filter(task => task.completed).length;
  let pending = tasks.filter(task => !task.completed).length;

  document.getElementById('count-all').innerText = all;
  document.getElementById('count-pending').innerText = pending;
  document.getElementById('count-completed').innerText = completed;

  taskcounter.innerText = `${all} Tasks`;

}
function updateEmptyState(tasks,titleText,subtitleText){
  let title = document.getElementById('empty-title');
  let subtitle = document.getElementById('empty-subtitle');

  if(tasks.length === 0){
    Notask_Model.style.display='block';
    title.textContent = titleText;
    subtitle.textContent = subtitleText;
    subtitle.style.paddingBottom='1rem'
   
  }
  else{
    Notask_Model.style.display='none';
  }

}
function clearInput(){
  
      titleInput.value= '';
  descInput.value= '';
  dateInput.value = '';
    tagInput.value = '';
      priorityInput.value = 'default'; 
  

}
function ShowErr(msg){
  let err = document.getElementById('msg')
  err.style.display='block';
  err.innerText = msg;
 
  setTimeout(()=>{
    err.style.display = 'none';
    err.innerText = '';
  },2000)
  

}
function showtoast(text,BGcolor){
  toast.innerText = text;
  toast.classList.add('show');
  toast.style.backgroundColor = BGcolor;
  setTimeout(()=>{
    toast.classList.remove('show');
    toast.style.backgroundColor = '';
  },2000)

}
function saveData() {
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}
Manubar.addEventListener('click', () => {
  if (!opennav) {
    opennav = true;
    Sidenav.style.width = '250px';
    if (window.innerWidth > 800) {
      bodylayout.style.marginLeft = '250px';
    }
  } else {
    opennav = false;
    Sidenav.style.width = '0';
    bodylayout.style.marginLeft = '0';
  }
  if (window.innerWidth <= 800) {
  overlay.style.display = 'block';
}
});
overlay.addEventListener('click', () => {
  // Close modal if it's open
  if (modal.style.display === 'block') {
    closeModal();
  }
  // Otherwise close sidebar if it's open
  else if (opennav) {
    opennav = false;
    Sidenav.style.width = '0';
    bodylayout.style.marginLeft = '0';
    overlay.style.display = 'none';
  }
});


Notask_btn.addEventListener('click', openModal);
createTaskBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
addTaskBtn.addEventListener('click', addTask);
deleteAlltask.addEventListener('click', removeAlltask);
allTask.addEventListener('click', () => {
  currentFilter = 'all';
  

  current_priority = ''
  HeaderText('All Tasks')
  filtering()
})
pendingTask.addEventListener('click', () => {
  currentFilter = 'pending';
  current_priority = ''
  HeaderText('Pending')
  filtering()
})
compTask.addEventListener('click', () => {
  currentFilter = 'Completed';
  current_priority = '';
  HeaderText('Completed')
  filtering()
})
high_priority.addEventListener('click', () => {
  current_priority = 'high';
  currentFilter = 'all';
  HeaderText('High Priority')
  filtering()
})
medium_priority.addEventListener('click', () => {
  current_priority = 'medium';
  currentFilter = 'all';
  HeaderText('Medium Priority')
  filtering()

})
low_priority.addEventListener('click', () => {
  
  current_priority = 'low';
  currentFilter = 'all';
  HeaderText('Low Priority')
  filtering()
})
searchInput.addEventListener('input', (e) =>{
  filtering()
})
filtered.addEventListener('change', (e) => {
filtering()
})
refreshUi()
