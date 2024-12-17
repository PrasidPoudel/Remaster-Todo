import "../styles/style.css";
//Import App Logic
import { App } from "./app";
//This stores the uuid for projects
export let uuid;
//This import the Module for creating dom
import { DOMProject } from "./domcreation";
import { Projects, Todos } from "./constructors";
//This is the main array which store the id project name and the project name todos
export const MAINARRAY = [];
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
  DOMProject.ProjectDomCreation(value, id);
  DOMProject.ToogleActive(); //Change color and background color of project when click
  MAINARRAY.push(new Projects(id, value, [])); //Making a object using Project Constructor
  App.uuidProject(); //This function is to get the uuid of project so we can add todo dynamicaly and easily
  console.log(MAINARRAY);
  ProjectForm.style.display = "none"; //Closing the form when user add the project
  projectform.value = ""; //Clearing value of form
});

//Now let's make the dialog for todo to popup and other stuff
const dialogbox = document.querySelector(".dialog");
const TodoPlus = document.querySelector(".task-Add");
TodoPlus.addEventListener('click',()=>{
  dialogbox.showModal()
})
const closedialog=document.querySelector(".cancel-todo")
closedialog.addEventLisgtener('click',()=>{
  dialogbox.close()
})