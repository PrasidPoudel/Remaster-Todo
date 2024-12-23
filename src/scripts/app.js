//We will create functions for app logic here
//Now let's create a function that gives the uuid of project when the user clicked projects
import { MAINARRAY,localstorage } from ".";
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
    for (let items of arr) {
      console.log('Item')
      console.log(items)
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
        localstorage()
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
              localstorage()
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
              localstorage()
              parent.classList.add("completed");
            }
          }
        }
        childrens.forEach((children) => {
          children.classList.add("line");
        });
      } else {
        for (let project of MAINARRAY) {
          for (let items of project.tasksarray) {
            if (items.id === id) {
              items.completed = false;
              localstorage()
              parent.classList.remove("completed");
            }
          }
        }
        childrens.forEach((children) => {
          children.classList.remove("line");
        });
      }
    });
  }
  //Now we are coming to end let's write a funciton for editing the Todo
  function editTodos() {
    const dialogbox = document.querySelector("dialog.edit");

    //Close the edit button too
    document.querySelector('.cancel-edit').addEventListener('click',(event)=>{
      event.preventDefault()
      dialogbox.close()
    })
    const addbutton = document.querySelector("#submit-edit"); //getting the add button for todo
    //Let's take a value of form so we can put the value of form there
    let title1 = document.getElementById("title1");
    let description1 = document.getElementById("description1");
    let duedate1 = document.getElementById("duedate1");
    let priority1 = document.getElementById("Priority1");
    let id = null;
    const editAll = document.querySelectorAll("img.edit-todo");
    for (let img of editAll) {
      img.addEventListener("click", () => {
        console.log(img);
        console.log(editAll);
        dialogbox.showModal();
        id = img.getAttribute("todoid"); //Getting id of image so we can edit it easily
        //We will have to take a look at this
        for (let project of MAINARRAY) {
          for (let items of project.tasksarray) {
            if (items.id === id) {
              console.log(id);
              console.log(typeof items.id, typeof id);
              title1.value = items.title;
              description1.value = items.description;
              duedate1.value = items.duedate;
              priority1.value = items.priority;
              break;
            }
          }
        }
        addbutton.addEventListener("click", (event) => {
          event.preventDefault();
          for (let project of MAINARRAY) {
            for (let items of project.tasksarray) {
              if (items.id === id) {
                console.log(id);
                items.title = title1.value;
                items.description = description1.value;
                items.duedate = duedate1.value;
                items.priority = priority1.value;
                localstorage()
                const pro = document.querySelector(`.parent-todo[todoid='${id}']`);
                console.log(pro);
                let tit = pro.querySelector(".title");
                tit.textContent = items.title;
                let due = pro.querySelector(".duedate");
                due.textContent = items.duedate;
    
                if (items.priority === "High")
                  pro.style.borderLeft = "20px solid red";
                else if (items.priority === "Medium")
                  pro.style.borderLeft = "20px solid yellow";
                else pro.style.borderLeft = "20px solid black";
                break;
              }
            }
          }
          dialogbox.close();
          id=null
        });
      });
    }
  }

  return {
    uuidProject,
    createTodos,
    DisplayTodo,
    removeProjects,
    RemoveTodos,
    CompletedTodos,
    editTodos,
  };
})();

export { App };
