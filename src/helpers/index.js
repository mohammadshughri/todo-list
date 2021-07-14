import { collatedTasks } from "../constants";

// This will be the function used for the Inbox, today, and next 7 days
export const collatedTasksExist = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject);
