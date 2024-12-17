//This module will do the DOM creation and deletion
const DOMProject = (function () {
  //This function creates the Project in DOM
  function ProjectDomCreation(value, uuid) {
    console.log(uuid);
    const parentProject = document.querySelector(".add-projects"); //This select the container where our project will be stored
    const children = document.createElement("div"); //This creates the div to store our project
    children.classList.add("project-item");
    children.setAttribute("uuid", uuid);
    children.textContent = value;
    parentProject.appendChild(children);
  }
  //This function is used to toggle by changing color of project giving user feeling of good UI/UX
  function ToogleActive() {
    const Projectslist = document.querySelectorAll(".project-item");
    Projectslist.forEach((project) => {
      project.addEventListener("click", () => {
        Projectslist.forEach((a)=>{
            a.classList.remove("active")
        })
        project.classList.add("active");
      });
    });
  }

  return { ProjectDomCreation, ToogleActive };
})();

export { DOMProject };
