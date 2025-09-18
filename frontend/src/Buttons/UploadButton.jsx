import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Typography } from '@mui/material';
import { useContext } from 'react';
import { TaskContext } from '../Context/TaskContext';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadButton({onFileSelect}) {
  const {file} = useContext(TaskContext);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    // console.log(uploadedFile);
    if (uploadedFile) {
      onFileSelect(uploadedFile);
    }
  };


  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<FileUploadIcon color='secondary'/>}
        sx={{width: "50%"}}
      >
        <Typography color='secondary' fontSize={"15px"}>Upload PDF</Typography>
        <VisuallyHiddenInput
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          multiple
        />
      </Button>
      {file && <Typography>{file.name}</Typography> }
    </>
    
  );
}