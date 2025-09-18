import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import UploadButton from '../Buttons/UploadButton';
import FormButtons from '../Buttons/FormButtons';
import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../Context/TaskContext';
import { createTask, updateTask } from '../Service';
import { enqueueSnackbar } from 'notistack';
import { formatDateForInput } from '../utils/date';

const style = {
  display: 'flex',
  flexDirection: "column",
  gap: "20px",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "5px"
};

export default function ModalForm({refreshTasks}) {
  const {open,handleClose,editTask,setEditTask,setTasks,file,setFile} = useContext(TaskContext);

  const [formData,setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  })

  useEffect(() => {
    
    if(editTask){
      // console.log(editTask.deadline);
      setFormData({
        title: editTask.title,
        description: editTask.description,
        deadline: editTask.deadline,
      })
    }
  },[editTask])


  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData((prev) => (
      {
        ...prev,
        [name]: value,
      }
    ))
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!editTask) {
      if (!file) {
        enqueueSnackbar("Please upload a PDF file", { variant: "warning" });
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("deadline", formData.deadline);
      formDataToSend.append("status", "TODO"); // or default
      formDataToSend.append("file", file); 
      let res = await createTask(formDataToSend);

      if (res.status === 201) {
        setTasks((prev) => [...prev, res.data]);
        enqueueSnackbar("Task created successfully!", { variant: "success" });
      }
    } else {
      let res = await updateTask(editTask._id, formData);

      if (res.status === 200) {
        enqueueSnackbar("Task edited successfully!", { variant: "success" });
        refreshTasks();
      }
    }
  } catch (error) {
    console.error(error.message);
    enqueueSnackbar("Error saving task", { variant: "error" });
  }

  // reset form
  setFormData({ title: "", description: "", deadline: "" });
  setFile(null);
  handleClose();
  setEditTask(null);
};


  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"}  onSubmit={handleSubmit}>
          <TextField
          required
          id="outlined-required"
          label="Title"
          fullWidth
          size='small'
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
            label="Description"
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            size='small'
            />
        <TextField
            type="date"
            label="Deadline"
            name="deadline"
            value={formatDateForInput(formData.deadline)}
            onChange={handleChange}
            required
            fullWidth
            size='small'
            InputLabelProps={{
              shrink: true,
            }}
            />
          {!editTask ? <UploadButton onFileSelect={setFile} />: <></>}
          <FormButtons isEdit={!!editTask} handleClose={handleClose}/>
        </Box>
      </Modal>
  );
}