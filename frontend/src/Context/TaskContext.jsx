// src/context/TaskContext.js
import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Modal state
  const [open, setOpen] = useState(false);
  const [editTask,setEditTask] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Task state
  const [tasks, setTasks] = useState([
    // Example object structure
    // { id: 1, title: "Sample Task", description: "Test", deadline: "2025-09-18", status: "TODO" }
  ]);

  const [file,setFile] = useState(null);


  return (
    <TaskContext.Provider
      value={{
        open,
        handleOpen,
        handleClose,
        tasks,
        editTask,
        setEditTask,
        setTasks,
        file,
        setFile
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
