import { IconButton, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green, blue,  red, purple } from "@mui/material/colors";
import { useContext } from "react";
import { TaskContext } from "../../Context/TaskContext";
import { useTasks } from "../../CustomHooks/useTasks";
import { enqueueSnackbar } from "notistack";
import { deleteTask, markTaskAsDone } from "../../Service";
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";

export default function TaskActions({ task}) {
  console.log(task);
    const {handleOpen,setEditTask} = useContext(TaskContext);
    const {refreshTasks} = useTasks();

    const handleEdit = () => {
        setEditTask(task);
        handleOpen();
    }

    const handleMarkAsDone = async () => {
      try {
        await markTaskAsDone(task._id);
        refreshTasks()
      } catch (error) {
        console.log(error.message)
        enqueueSnackbar("Error Marking Done",{variant: "error"})
      }
    }

    const handleDelete = async () => {
     
      try {
        await deleteTask(task._id);
        refreshTasks()
      } catch (error) {
        enqueueSnackbar("Error Deleting task",{variant: "error"})
      }
    }



const handleDownload = async (filename) => {
  try {
    const response = await axios.get(`http://localhost:8082/tasks/download/${filename}`, {
      responseType: "blob", // important for binary data
    });

    // ✅ Create a blob URL and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Download failed:", err);
  }
};


const handlePreview = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:8082/tasks/preview/${filename}`, {
        responseType: "blob", // receive as binary
      });

      const file = new Blob([response.data], { type: response.data.type || "application/octet-stream" });
      const url = window.URL.createObjectURL(file);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Preview failed:", err);
    }
  };




  return (
    <Stack direction="row" >
      {task.status === "TODO" ? (
        <IconButton
          aria-label="mark task as done"
          onClick={handleMarkAsDone}
          sx={{
            color: green[600],
            "&:hover": { color: green[700] },
          }}
        >
          <CheckCircleIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="download task"
          onClick={() => handleDownload(task.fileName)}
          sx={{
          color: blue[500],
          "&:hover": { color: blue[600] },
        }}

        >
          <DownloadIcon />
        </IconButton>
      )}
      <IconButton aria-label="preview task" onClick={() => handlePreview(task.fileName)}>
        <VisibilityIcon /> {/* 👀 an eye icon */}
      </IconButton>
      <IconButton
        aria-label="edit task"
        onClick={handleEdit}
        sx={{
          color: purple[500],
          "&:hover": { color: purple[600] },
        }}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        aria-label="delete task"
        onClick={handleDelete}
        sx={{
          color: red[500],
          "&:hover": { color: red[600] },
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
