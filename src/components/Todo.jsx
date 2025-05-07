import React, { useState } from 'react';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inProgressList, setInProgressList] = useState([]);
  const [completeList, setCompleteList] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const moveToInProgress = (item) => {
    setTodos(todos.filter((todo) => todo !== item));
    setInProgressList([...inProgressList, item]);
  };

  const moveToComplete = (item) => {
    setInProgressList(inProgressList.filter((todo) => todo !== item));
    setCompleteList([...completeList, item]);
  };

  const handleDelete = (listType, item) => {
    if (listType === 'todo') {
      setTodos(todos.filter((todo) => todo !== item));
    } else if (listType === 'inProgress') {
      setInProgressList(inProgressList.filter((todo) => todo !== item));
    } else if (listType === 'complete') {
      setCompleteList(completeList.filter((todo) => todo !== item));
    }
  };

  return (
    <div style={{ width: "90%", margin: "30px auto" }}>
      {/* Input Section */}
      <div
        style={{
          marginBottom: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new task"
          style={{
            padding: "12px 16px",
            width: "60%",
            minWidth: "250px",
            border: "1px solid #F75A5A",
            borderRadius: "8px",
            outline: "none",
            color: "#F75A5A",
            fontSize: "16px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
        <button
          onClick={handleAddTodo}
          style={{
            padding: "12px 20px",
            backgroundColor: "#F75A5A",
            color: "#FFF",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            minWidth: "120px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e14c4c")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#F75A5A")}
        >
          Add Todo
        </button>
      </div>

      {/* Todo, InProgress, Complete Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Todo Column */}
        <div
          style={{
            backgroundColor: "#F9F4F4",
            flex: 1,
            minWidth: "300px",
            minHeight: "280px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ color: "#F75A5A", textAlign: "center", marginBottom: "20px" }}>Todo</h3>
          <ul style={{ listStyleType: "none", paddingLeft: "0", flexGrow: 1 }}>
            {todos.map((todo) => (
              <li
                key={todo}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "10px",
                  margin: "8px 0",
                  border: "1px solid #F75A5A",
                  borderRadius: "5px",
                  backgroundColor: "#FFF",
                  color: "#F75A5A",
                  fontWeight: "500",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onClick={() => moveToInProgress(todo)}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#F75A5A";
                  e.currentTarget.style.color = "#FFF";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFF";
                  e.currentTarget.style.color = "#F75A5A";
                }}
              >
                <span>{todo}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete('todo', todo);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#F75A5A",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* InProgress Column */}
        <div
          style={{
            backgroundColor: "#FFF5D1",
            flex: 1,
            minWidth: "300px",
            minHeight: "280px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ color: "#FFD63A", textAlign: "center", marginBottom: "20px" }}>InProgress</h3>
          <ul style={{ listStyleType: "none", paddingLeft: "0", flexGrow: 1 }}>
            {inProgressList.map((todo) => (
              <li
                key={todo}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "10px",
                  margin: "8px 0",
                  border: "1px solid #FFD63A",
                  borderRadius: "5px",
                  backgroundColor: "#FFF",
                  color: "#FFD63A",
                  fontWeight: "500",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onClick={() => moveToComplete(todo)}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFD63A";
                  e.currentTarget.style.color = "#FFF";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFF";
                  e.currentTarget.style.color = "#FFD63A";
                }}
              >
                <span>{todo}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete('inProgress', todo);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#FFD63A",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Complete Column */}
        <div
          style={{
            backgroundColor: "#E0F8F1",
            flex: 1,
            minWidth: "300px",
            minHeight: "300px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ color: "#077A7D", textAlign: "center", marginBottom: "20px" }}>Complete</h3>
          <ul style={{ listStyleType: "none", paddingLeft: "0", flexGrow: 1 }}>
            {completeList.map((todo) => (
              <li
                key={todo}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  margin: "8px 0",
                  border: "1px solid #077A7D",
                  borderRadius: "5px",
                  backgroundColor: "#FFF",
                  color: "#077A7D",
                  fontWeight: "500",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <span>{todo}</span>
                <button
                  onClick={() => handleDelete('complete', todo)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#077A7D",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
