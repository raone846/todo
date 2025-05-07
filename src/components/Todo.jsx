import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Todo.css';
import { FaTrashAlt } from 'react-icons/fa';

function Todo() {
  // Initialize state from sessionStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = sessionStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Update sessionStorage whenever todos change
    sessionStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: uuidv4(), text: inputValue, status: 'todo' }]);
      setInputValue('');
    }
  };

  const changeStatus = (id, newStatus) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderTodosByStatus = (status) => {
    return todos
      .filter(todo => todo.status === status)
      .map(todo => (
        <li
          key={todo.id}
          className={`todo-item ${status}`}
        >
          <span
            style={{ flexGrow: 1, fontWeight: '500', cursor: 'pointer' }}
            onClick={() => {
              if (status === 'todo') changeStatus(todo.id, 'inprogress');
              else if (status === 'inprogress') changeStatus(todo.id, 'complete');
            }}
          >
            {todo.text}
          </span>
          <button className="delete-button" onClick={handleDelete.bind(null, todo.id)}> 
                <FaTrashAlt />
            </button>
        </li>
      ));
  };

  return (
    <div className="todo-container">
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new task"
          className="input-field"
        />
        <button
          onClick={handleAddTodo}
          className="add-button"
        >
          Add Todo
        </button>
      </div>

      <div className="columns-container">
        {/* Todo */}
        <div className="column" style={{ backgroundColor: "#F9F4F4" }}>
          <h3 style={{ color: "#F75A5A" }}>Todo</h3>
          <ul className="todo-list">
            {renderTodosByStatus('todo')}
          </ul>
        </div>

        {/* InProgress */}
        <div className="column" style={{ backgroundColor: "#FFF5D1" }}>
          <h3 style={{ color: "#FFD63A" }}>InProgress</h3>
          <ul className="todo-list">
            {renderTodosByStatus('inprogress')}
          </ul>
        </div>

        {/* Complete */}
        <div className="column" style={{ backgroundColor: "#E0F8F1" }}>
          <h3 style={{ color: "#077A7D" }}>Complete</h3>
          <ul className="todo-list">
            {renderTodosByStatus('complete')}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
