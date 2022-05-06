import {v4 as uuidV4} from 'uuid'

type Task = {
  id: any;
  title: string,
  comepleted: boolean,
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("task-form") as HTMLFormElement | null; 
const input = document.querySelector<HTMLInputElement>("#task-input");
const tasks: Task[] = loadTask();

tasks.forEach(addItemListener);
form?.addEventListener("submit", e=>{
  e.preventDefault();

  if(input?.value =="" || input?.value==null) return

  const newtask: Task = {
    id: uuidV4(),
    title: input.value,
    comepleted: false,
    createdAt: new Date()

  } 
  tasks.push(newtask); 
  saveTask();

  addItemListener(newtask);
  input.value ="";
})
function addItemListener(task : Task){
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
   
    checkbox.addEventListener("change", () =>{
      task.comepleted = checkbox.checked;
      saveTask();
    });
    checkbox.type = "checkbox";
    checkbox.checked = task.comepleted;
    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);
}
function saveTask(){
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTask(): Task[]{
  const taskJson= localStorage.getItem("TASKS" );
  if(taskJson == null) return []
  return JSON.parse(taskJson);
}
