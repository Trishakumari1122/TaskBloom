// Utility functions to manage tasks in localStorage

export const getTasks = () => {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks || !Array.isArray(tasks)) {
    tasks = [];
  }
  return tasks;
};

export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
