import { useState, useEffect, useContext } from "react";
import { fetchTasks } from "../Service";
import { TaskContext } from "../Context/TaskContext";

export const useTasks = () => {
  const {tasks,setTasks} = useContext(TaskContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const refreshTasks = async () => {
    setLoading(true);
    const data = await fetchTasks();
    setTasks(data);
    setLoading(false);
  };

  return { loading, refreshTasks };
};
