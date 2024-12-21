//We will create functions for app logic here
//Now let's create a function that gives the uuid of project when the user clicked projects
import { MAINARRAY } from ".";
import Delete from "../img/delete.svg";
import { DOMProject } from "./domcreation";

const App = (function () {
  function uuidProject() {
    const projectsChild = document.querySelectorAll(".add-projects>div");
    projectsChild.forEach((project) => {
      project.addEventListener("click", () => {
        let uuid = project.getAttribute("uuid");
        console.log(uuid);
      });
    });
  }
  //This function is to display todos on click on project
  function createTodos(uuid) {
    let arr = [];
    for (let project of MAINARRAY) {
      if (project.id === uuid) {
        arr = project.tasksarray;
        break;
      }
    }

    //NOw let's display the todo to the user
    DisplayTodo(arr);
  }

  //Display Todo function which take an array and create todos
  function DisplayTodo(arr) {
    const todoContainer = document.querySelector(".add-todo");
    for (let items of arr) {
      DOMProject.createTodoForm(items);
    }
  }
  function removeProjects() {
    const imageAll = document.querySelectorAll("img.delete-project");
    imageAll.forEach((img) => {
      img.addEventListener("click", () => {
        let uuid = img.getAttribute("uuid"); // Get the 'uuid' attribute of the img element
        const projectitem = document.querySelector(
          `.project-item[uuid="${uuid}"]`
        );
        if (projectitem.hasAttribute(".active")) {
          document.querySelector(".taskAdd").style.display = "none";
          document.querySelector(".add-todo").innerHTML = "";
          document.querySelector(".name").textContent = "";
        }
        projectitem.remove();
        let id = MAINARRAY.findIndex((project) => project.id === uuid);
        MAINARRAY.splice(id, 1);
      });
    });
  }

  function RemoveTodos() {
    const imageAll = document.querySelectorAll("img.delete-todo");
    imageAll.forEach((img) => {
      img.addEventListener("click", () => {
        let id = img.getAttribute("todoid");
        let todo = document.querySelector(`.parent-todo[todoid='${id}']`);
        for (let projects of MAINARRAY) {
          for (let items of projects.tasksarray) {
            if (items.id === id) {
              projects.tasksarray.splice(items, 1);
              todo.remove();
            }
          }
        }
      });
    });
  }
  function CompletedTodos() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      let id = checkbox.getAttribute("todoid");
      const parent = document.querySelector(`.parent-todo[todoid='${id}']`);
      const childrens = parent.querySelectorAll("div");
      if (checkbox.checked) {
        for (let project of MAINARRAY) {
          for (let items of project.tasksarray) {
            if (items.id === id) {
              items.completed = true;
            }
          }
        }
        childrens.forEach((children) => {
          children.classList.add('line')
        });
      } else {
        for (let project of MAINARRAY) {
          for (let items of project.tasksarray) {
            if (items.id === id) {
              items.completed = false;
            }
          }
        }
        childrens.forEach((children) => {
          children.classList.remove('line')
        });
      }
    });
  }
  //This function applies linethrough or none decoration
  
  return {
    uuidProject,
    createTodos,
    DisplayTodo,
    removeProjects,
    RemoveTodos,
    CompletedTodos,
  };
})();

export { App };
