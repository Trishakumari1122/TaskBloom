import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <small>{new Date(task.createdAt).toLocaleString()}</small>
      </div>
      <div>
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <button onClick={() => onDelete(task.id)}>🗑</button>
      </div>
    </div>
  );
};

export default TaskItem;
