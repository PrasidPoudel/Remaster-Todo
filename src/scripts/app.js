//We will create functions for app logic here
//Now let's create a function that gives the uuid of project when the user clicked projects
import { MAINARRAY } from ".";
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
    let arr=[]
    for (let project of MAINARRAY) {
      if (project.id === uuid) {
        arr = project.tasksarray;
        break;
      }
    }

    //NOw let's display the todo to the user
    DisplayTodo(arr)
  }

  //Display Todo function which take an array and create todos
  function DisplayTodo(arr) {
    const todoContainer = document.querySelector(".add-todo");
    for (let items of arr) {
      const parent = document.createElement("div");
      parent.classList.add("parent-todo");
      let checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      const title = document.createElement("div");
      title.textContent = items.title;
      const duedate = document.createElement("div");
      duedate.textContent = items.duedate;
      parent.appendChild(checkbox);
      parent.appendChild(title);
      parent.appendChild(duedate);
      todoContainer.appendChild(parent);
    }
    
  }
  function removeProjects() {
    const imageAll=document.querySelectorAll('img.delete-project')
    imageAll.forEach((img)=>{
      img.addEventListener('click',()=>{
        let uuid = img.getAttribute('uuid');  // Get the 'uuid' attribute of the img element
        const projectitem = document.querySelector(`.project-item[uuid="${uuid}"]`);
        projectitem.remove()
        let id=MAINARRAY.findIndex((project)=>project.id===uuid)
        MAINARRAY.splice(id,1)
        if(projectitem.hasAttribute('active')) document.querySelector('.add-todo').innerHTML=''
      })
    })
  }
  return { uuidProject,createTodos,DisplayTodo,removeProjects};
})();

export { App };
