
// Sample data for testing
const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application",
    completed: false,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    completed: true,
    createdAt: "2024-01-14T15:30:00Z"
  }
];

// Utility functions to manage tasks in localStorage
// This file provides functions to get and save tasks in localStorage.
// It initializes with sample tasks if no tasks are found in localStorage.
export const getTasks = () => {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    tasks = sampleTasks;
    console.log('Initialized with sample tasks:', tasks);
  } else {
    console.log('Loaded tasks from localStorage:', tasks);
  }
  return tasks;
};


export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
