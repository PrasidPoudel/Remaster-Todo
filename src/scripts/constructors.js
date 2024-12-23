import { v4 as uuidv4 } from "uuid";
//The id gives every project unique identity by with it will make us easy later
class Projects {
  constructor(id, projectName, tasksarray = []) {
    this.id = id;
    this.projectName = projectName;
    this.tasksarray = tasksarray;
  }
}
//Constructor For Todo
class Todos {
  constructor(id, title, description, duedate, priority, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.duedate = duedate;
    this.priority = priority;
    this.completed = completed;
  }
}
export { Projects, Todos };
