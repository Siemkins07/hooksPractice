import React, { useState } from "react";
import axios from "axios";

const Task = () => {
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleListChange = () => {
    setTaskList(taskList.concat(taskInput));
    handleResetInput();
    axios
      .post(
        "https://taskmanager-84565-default-rtdb.firebaseio.com/tasks.json",
        { name: taskInput }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleResetInput = () => {
    setTaskInput("");
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="start writing"
        onChange={handleInputChange}
        value={taskInput}
      />
      <button onClick={handleListChange} type="button">
        Add
      </button>
      <ul>
        {taskList.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Task;
