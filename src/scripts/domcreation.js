//Importing the main array
import { MAINARRAY } from ".";
import { App } from "./app";
import Delete from "../img/delete.svg"
import edited from "../img/edit.svg"
//This module will do the DOM creation and deletion
const DOMProject = (function () {
  //This function creates the Project in DOM
  function ProjectDomCreation(value, uuid) {
    console.log(uuid);
    //Delete project option
    const img=document.createElement('img')
    img.src=Delete
    img.setAttribute('uuid',uuid)
    img.classList.add('delete-project')

    const projectname=document.createElement('div')
    projectname.textContent=value
    const parentProject = document.querySelector(".add-projects"); //This select the container where our project will be stored
    const children = document.createElement("div"); //This creates the div to store our project
    children.classList.add("project-item");
    children.setAttribute("uuid", uuid);
    children.appendChild(projectname)
    children.appendChild(img)
    parentProject.appendChild(children);
  }
  //This function is used to toggle by changing color of project giving user feeling of good UI/UX and putting the name of project in div.name
  function ToogleActive() {
    const name=document.querySelector('.name')
    const Projectslist = document.querySelectorAll(".project-item");
    Projectslist.forEach((project) => {
      project.addEventListener("click", () => {
        const element=project.querySelector('div')
        name.textContent=element.textContent
        Projectslist.forEach((a) => {
          a.classList.remove("active");
        });
        project.classList.add("active");
      });
    });
  }

  //This function is to show the taskAdd function when projects are clicked
  function showTaskAdd() {
    const All = document.querySelectorAll(".add-projects>div");
    const taskAdd = document.querySelector(".taskAdd");
    All.forEach((item) => {
      item.addEventListener("click", () => {
        taskAdd.style.display = "block";
      });
    });
  }
  //This
  function createTodoForm(obj) {
    //Let's create img too
    let img=document.createElement('img')
    img.classList.add('delete-todo')
    img.src=Delete
    img.setAttribute('todoid',obj.id)
    const edit=document.createElement('img')
    edit.src=edited
    edit.setAttribute('todoid',obj.id)
    edit.classList.add('edit-todo')
    const imgdiv=document.createElement('div')
    imgdiv.classList.add('imgdiv')
    imgdiv.appendChild(edit)
    imgdiv.appendChild(img)
    const todoContainer = document.querySelector(".add-todo");
    const parent = document.createElement("div");
    parent.classList.add("parent-todo");
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute('todoid',obj.id)
   checkbox.addEventListener('change',App.CompletedTodos)

   const checkboxes= document.querySelectorAll('input[type="checkbox"]'); 
   checkboxes.forEach((item)=>{
    item.addEventListener('change',App.CompletedTodos)
   })

    let title = document.createElement("div");
    title.textContent = obj.title;
    title.classList.add('title')

    title.setAttribute('todoid',obj.id)
    let duedate = document.createElement("div");
    duedate.textContent = obj.duedate;
    duedate.classList.add('duedate')
    duedate.setAttribute('todoid',obj.id)

    if(obj.priority==='High') parent.style.borderLeft='20px solid red'
    else if(obj.priority==='Medium') parent.style.borderLeft='20px solid yellow'
    else parent.style.borderLeft='20px solid black'
    parent.appendChild(checkbox);
    parent.appendChild(title);
    parent.appendChild(duedate);
    parent.appendChild(imgdiv)
    parent.setAttribute('todoid',obj.id)

    if (obj.completed) {
      checkbox.checked = true;
      parent.classList.add('completed')
      title.classList.add('line');
      duedate.classList.add('line')
  } else {
      checkbox.checked = false;
      parent.classList.remove('completed')
      duedate.classList.remove('line');
      title.classList.remove('line')
  }

    todoContainer.appendChild(parent);
    App.editTodos()
    //This Remove The Todo list tried other ways but only worked when nesting here
    App.RemoveTodos()
  }

  function ProjectClickTodo() {
    let uuid;
    //This is todo container

    //This is to clear all the todos when user click on each project
    const All = document.querySelectorAll(".add-projects>div");
    All.forEach((item) => {
      item.addEventListener("click", () => {
        document.querySelector(".add-todo").innerHTML = "";
        uuid = item.getAttribute("uuid");
        App.createTodos(uuid);
      });
    });

    //Now we have select active project and display it's todo
    //This is for displaying all todo when user clicked on inbox
  }
  function InboxTodo() {
    let arr = [];
    for (let projects of MAINARRAY) {
      arr = arr.concat(projects.tasksarray);
    }
    console.log('arr')
    console.log(arr)
    App.DisplayTodo(arr);
  }

  return {
    ProjectDomCreation,
    ToogleActive,
    showTaskAdd,
    createTodoForm,
    ProjectClickTodo,
    InboxTodo,
  };
})();

export { DOMProject };
