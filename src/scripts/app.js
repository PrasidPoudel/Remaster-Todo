//We will create functions for app logic here
//Now let's create a function that gives the uuid of project when the user clicked projects
import { uuid } from ".";

const App = function () {
  function uuidProject() {
    const projectsChild = document.querySelectorAll('.add-projects>div');
    projectsChild.forEach((project) => {
      project.addEventListener('click', () => {
        uuid = project.getAttribute('uuid');
        console.log(uuid);
      });
    });
  }
  return {uuidProject}
}();

export { App };
