import AddIcon  from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab'
import { useContext } from 'react';
import { TaskContext } from '../Context/TaskContext';

const CreateButton = () => {
  const {handleOpen} = useContext(TaskContext);
    return (
        <Box
            sx={{
              position: "fixed",
              right: 20,
              bottom: 20,
            }}
          >
            <Fab size="large" color="primary" aria-label="add" onClick={handleOpen}>
              <AddIcon color="secondary" fontSize='large' />
            </Fab>
      </Box>
    );
}

export default CreateButton;