import React, { useState, useEffect } from "react";
import axios from "axios";

const Task = () => {
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    axios
      .get("https://taskmanager-84565-default-rtdb.firebaseio.com/tasks.json")
      .then((res) => {
        console.log(res);
        const tasksData = res.data;
        const arrTasks = [];
        for (const key in tasksData) {
          arrTasks.push({ id: key, name: tasksData[key].name });
        }
        setTaskList(arrTasks);
      });
    return () => {
      console.log("Cleanup");
    };
  }, [taskInput]);

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
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Task;
