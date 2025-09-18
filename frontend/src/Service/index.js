import axios from "axios";

const API_URL = "http://localhost:8082/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (formData) => {
  const response = await axios.post(API_URL, formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    }});
  return response;
};

export const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${API_URL}/${taskId}`, taskData);
  return response;
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
};

export const markTaskAsDone = async (taskId) => {
  await axios.patch(`${API_URL}/${taskId}/status`, { status: "DONE" });
};
