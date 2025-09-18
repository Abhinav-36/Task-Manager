import {  Button, Stack } from "@mui/material";


export default function FormButtons({handleClose,isEdit}){
    return(
        <Stack direction="row" justifyContent={"space-between"} >
            <Button variant="contained" color="secondary" 
            sx={{color: "primary.main"}} onClick={handleClose}>CANCEL</Button>
            <Button variant="contained" type="submit"
            sx={{color: "secondary.main"}} >{isEdit? "UPDATE": "SAVE"}</Button>
        </Stack>
    );
}