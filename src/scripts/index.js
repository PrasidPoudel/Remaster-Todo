import "../styles/style.css";
//This is the main array which store the id project name and the project name todos
export let MAINARRAY = [];
if(localStorage) {
  MAINARRAY=JSON.parse(localStorage.getItem('array'))

  let arr=[]
  for (let projects of MAINARRAY) {
    arr = arr.concat(projects.tasksarray);
  }
  App.DisplayTodo(arr);
  console.log(MAINARRAY)
  for(let project of MAINARRAY) {
    DOMProject.ProjectDomCreation(project.projectName,project.id)
   
  }
  DOMProject.ToogleActive()
  DOMProject.showTaskAdd()
  App.RemoveTodos()
  DOMProject.ProjectClickTodo()
  App.removeProjects()
}
//For inbox we don't have to show todo add
const inbox = document.querySelector(".inbox");
inbox.addEventListener("click", () => {
  document.querySelector(".taskAdd").style.display = "none";
});
//Import App Logic
import { App } from "./app";
//This stores the uuid for projects
//export let uuid;
//This import the Module for creating dom
import { DOMProject } from "./domcreation";
import { Projects, Todos } from "./constructors";

//This is a random uuid generator
import { v4 as uuidv4 } from "uuid";
//Let's open the project form first
const add_project = document.querySelector(".projects");
const ProjectForm = document.querySelector(".projects-form"); //Parent for the Project form
add_project.addEventListener("click", () => {
  ProjectForm.style.display = "block";
  document.querySelector("#project-label").focus();
});

//Now let's close the Form when user click on cancel
const cancelProject = document.querySelector(".cancel-button");
cancelProject.addEventListener("click", (event) => {
  event.preventDefault();
  ProjectForm.style.display = "none"; //Closing the form when user cancel the project
  projectform.value = ""; //Clearing value of form
});
//We have to actually create Project in DOM and in array tooc
const submitproject = document.querySelector(".add-button"); //Selecting button for submitting project
const cancelproject = document.querySelector(".button-cancel"); //Selecting button for canceling project
const projectform = document.querySelector("#project-label"); //Selecting the label for project(Form)
submitproject.addEventListener("click", (event) => {
  event.preventDefault();
  let id = uuidv4();
  const value = projectform.value;
  //Form validation
  if(value!=='') {
  DOMProject.ProjectDomCreation(value, id);
  DOMProject.showTaskAdd(); //This function is to show the taskAdd function when projects are clicked
  DOMProject.ToogleActive(); //Change color and background color of project when click
  MAINARRAY.push(new Projects(id, value, [])); //Making a object using Project Constructor
  localstorage()
  DOMProject.ProjectClickTodo()//This is to display the todos of different projects
  App.uuidProject(); //This function is to get the uuid of project so we can add todo dynamicaly and easily
  console.log(MAINARRAY);
  ProjectForm.style.display = "none"; //Closing the form when user add the project
  projectform.value = ""; //Clearing value of form
  App.removeProjects()//Remove the projects
  }
  else alert('Fill up the Forms Correctly')
});

//Now let's make the dialog for todo to popup and other stuff
const dialogbox = document.querySelector(".dialog");
const TodoPlus = document.querySelector(".taskAdd");
TodoPlus.addEventListener("click", () => {
  dialogbox.showModal();
});
const closedialog = document.querySelector(".cancel-todo");
closedialog.addEventListener("click", (event) => {
  event.preventDefault()
  document.getElementById('title').value=''
  document.getElementById('description').value=''
  document.getElementById('duedate').value=''
  dialogbox.close();
});

//Testing
const addTodo=document.querySelector('#submit')

addTodo.addEventListener('click',(event)=>{
  event.preventDefault()
  let id=uuidv4()//Id for each of unique project
  const p=document.querySelector('.add-projects>div.active')
  let uuid=p.getAttribute('uuid')
  console.log('UUid'+uuid)
  let title=document.getElementById('title').value
  let description=document.getElementById('description').value
  let duedate=document.getElementById('duedate').value
  let priority=document.getElementById('Priority').value
  for(let i=0;i<MAINARRAY.length;i++) {
    if(MAINARRAY[i].id===uuid) {
      if(title!=='' && duedate ) {
      let obj=new Todos(id,title,description,duedate,priority,false)
      MAINARRAY[i].tasksarray.push(obj)
      localstorage()
      DOMProject.createTodoForm(obj)
    } else {
      alert('Fill up the forms correctly')
    }
  }
  }
  console.table(MAINARRAY)
  console.log(MAINARRAY)
  //Cleat the form
  document.getElementById('title').value=''
  document.getElementById('description').value=''
  document.getElementById('duedate').value=''
  dialogbox.close()
})

const inb=document.querySelector('.home')
inb.addEventListener('click',()=>{
  document.querySelector('.taskAdd').style.display='none'
  DOMProject.InboxTodo()
})
/**
 * LOCAL STORAGE DING DING
 * keep updating local storage with main array idea and set the item when project or todo is being removed and created
 */
 function localstorage() {
 localStorage.setItem('array',JSON.stringify(MAINARRAY))

 }
 export {localstorage}