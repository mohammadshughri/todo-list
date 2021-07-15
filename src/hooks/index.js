import { useState, useEffect } from "react";
import { firebase } from '../firebase';
import { collatedTasksExist } from "../helpers";
import moment from "moment";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "AIzaSyCPjNN4r6MVNZ7DXi_0pgEcqkftPQkocgE");

    // If we have a selected project and there's no collated tasks we will unsubscribe
    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      // Check the selected task and filter the task that is less than 7 days if they are archived
      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              (task) =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
           // else, filter the new tasks with an archive
           : newTasks.filter((task) => task.archived !== true)
      );

      //return all the tasks true (archived)
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();

    // When the array is empty it is used to prevent from running the app over and over and only run it once
    // When the value of the selectedProject changes rerun all of the hooks
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firebase()
      .collection("projects")
      .where("userId", "==", "AIzaSyCPjNN4r6MVNZ7DXi_0pgEcqkftPQkocgE")
      .orderBy("projectId")
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));
        // We use this condition to prevent the [projects] from running and setting the project over and over again.
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
