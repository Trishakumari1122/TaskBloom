import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faCalendarDay, faSignOutAlt, faBullseye,
  faCheckCircle, faClock, faTrophy, faSearch,
  faPlus, faTasks, faEdit, faTrashAlt, faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { getTasks, saveTasks } from './utils/localStorage';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  return (
    <div className="login-bg">
      <div className="login-center">
        <h1 className="main-title login-title">TaskBloom</h1>
        <div className="login-tagline">Your Personal Productivity Hub</div>
        <div className="login-card glass-card">
          <h2 className="login-welcome">Welcome</h2>
          <div className="login-instruction">Enter your username to start managing your tasks</div>
          <form onSubmit={(e) => { e.preventDefault(); if (username.trim()) { localStorage.setItem('username', username); onLogin(username); } }}>
            <div className="input-group">
              <span className="input-icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <button type="submit" className="login-btn">
              <span className="btn-icon"><FontAwesomeIcon icon={faSignOutAlt} className="fa-rotate-180" /></span> Get Started
            </button>
          </form>
        </div>
        <div className="login-footer">Stay organized. Stay productive. Stay ahead.</div>
      </div>
    </div>
  );
};

const App = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState(getTasks());
  const [showAddCard, setShowAddCard] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title, description, priority = 'medium') => {
    const Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks([Task, ...tasks]);
    setShowAddCard(false);
  };

  const updateTask = (id, title, description, priority = 'medium') => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      title,
      description,
      priority,
      updatedAt: new Date().toISOString()
    } : t));
    setEditTaskId(null);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      completed: !t.completed,
      updatedAt: new Date().toISOString()
    } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const TaskCard = ({ task }) => {
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);
    const [editPriority, setEditPriority] = useState(task.priority || 'medium');
    const isEditing = editTaskId === task.id;

    return (
      <div className={`task-card priority-${task.priority || 'medium'}${task.completed ? ' completed' : ''}`}>
        {isEditing ? (
          <>
            <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
            <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} />
            <div className="priority-selector">
              <label>Priority:</label>
              <select value={editPriority} onChange={e => setEditPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="task-actions">
              <button className="save-btn" onClick={() => updateTask(task.id, editTitle, editDescription, editPriority)}>
                <FontAwesomeIcon icon={faSave} /> Save
              </button>
              <button className="cancel-btn" onClick={() => setEditTaskId(null)}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="task-card-header">
              <h4>{task.title}</h4>
              <div className="task-card-actions">
                <span className="priority-badge">{task.priority || 'medium'}</span>
                <button title="Edit" onClick={() => setEditTaskId(task.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button title="Delete" onClick={() => deleteTask(task.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
            {task.description && <div className="task-card-desc">{task.description}</div>}
            <div className="task-card-meta">
              <span className="task-date">
                <FontAwesomeIcon icon={faCalendarDay} className="meta-icon" />
                {new Date(task.createdAt).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>
            <div className="task-card-footer">
              <label className="done-toggle">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                <span className="checkmark"></span>
                <span className="done-label">Done</span>
              </label>
            </div>
          </>
        )}
      </div>
    );
  };

  const AddTaskCard = ({ onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');

    return (
      <div className="modal-overlay">
        <div className="task-add-card modal-card">
          <button className="modal-close" onClick={onCancel} title="Close">✖</button>
          <h3>Add New Task</h3>
          <input type="text" placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea placeholder="Task description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
          <div className="priority-selector">
            <label className='priority1'>Priority:</label>
            <select className='priority' value={priority} onChange={e => setPriority(e.target.value)}>
              <option className='priority' value="low">Low</option>
              <option className='priority' value="medium">Medium</option>
              <option className='priority' value="high">High</option>
            </select>
          </div>
          <div className="task-add-actions">
            <button className="save-btn" onClick={() => { if (title.trim()) onSave(title, description, priority); }}>Save</button>
            <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const filteredTasks = tasks.filter(t =>
    (t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const counts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  const completion = tasks.length ? Math.round((counts.completed / tasks.length) * 100) : 0;
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
  };

  if (!username) return <Login onLogin={setUsername} />;

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <div className="dashboard-header-card">
          <div className="header-left">
            <div className="header-avatar">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div>
              <div className="header-welcome">Welcome <b>{username}</b></div>
              <div className="header-date"><FontAwesomeIcon icon={faCalendarDay} /> {today}</div>
            </div>
          </div>
          <button className="signout-btn" onClick={handleLogout}>
            <span className="btn-icon"><FontAwesomeIcon icon={faSignOutAlt} /></span> Sign Out
          </button>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card stat-blue">
            <div className="stat-icon"><FontAwesomeIcon icon={faBullseye} /></div>
            <div className="stat-value">{counts.all}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card stat-green">
            <div className="stat-icon"><FontAwesomeIcon icon={faCheckCircle} /></div>
            <div className="stat-value">{counts.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card stat-orange">
            <div className="stat-icon"><FontAwesomeIcon icon={faClock} /></div>
            <div className="stat-value">{counts.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card stat-purple">
            <div className="stat-icon"><FontAwesomeIcon icon={faTrophy} /></div>
            <div className="stat-value">{completion}%</div>
            <div className="stat-label">Completion</div>
          </div>
        </div>

        <div className="dashboard-filter-bar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span className="search-icon"><FontAwesomeIcon icon={faSearch} /></span>
          </div>
          <button className="add-task-btn" onClick={() => setShowAddCard(true)}>
            <span className="btn-icon"><FontAwesomeIcon icon={faPlus} /></span> Add New Task
          </button>
        </div>

        {showAddCard && <AddTaskCard onSave={addTask} onCancel={() => setShowAddCard(false)} />}

        <div className="dashboard-task-list">
          {filteredTasks.length === 0 ? (
            <div className="dashboard-empty">
              <div className="empty-icon"><FontAwesomeIcon icon={faTasks} /></div>
              <div className="empty-title">No tasks yet</div>
              <div className="empty-desc">Create your first task to get started!</div>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
