import React from 'react';

const TaskFilter = ({ current, onChange, counts }) => {
  return (
    <div className="task-filter">
      <button onClick={() => onChange('all')} className={current === 'all' ? 'active' : ''}>All ({counts.all})</button>
      <button onClick={() => onChange('completed')} className={current === 'completed' ? 'active' : ''}>Completed ({counts.completed})</button>
      <button onClick={() => onChange('pending')} className={current === 'pending' ? 'active' : ''}>Pending ({counts.pending})</button>
    </div>
  );
};

export default TaskFilter;
