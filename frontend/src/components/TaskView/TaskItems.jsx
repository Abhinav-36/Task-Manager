import { Chip, Stack, TableCell, TableRow, Typography } from "@mui/material";
import TaskActions from "./TaskActions";
import { formatDateForDisplay } from "../../utils/date";
import { green, orange } from "@mui/material/colors";

const DeadlineCell = ({deadline,status}) =>{
    const formatedDeadline = formatDateForDisplay(deadline);

    const compareDeadline = () => {
        return new Date(deadline).getTime() < Date.now();
    }
    return(
        <Stack direction={"column"}>
            <Typography>{formatedDeadline}</Typography>
            <Typography fontStyle={"italic"}>
                {compareDeadline() ? "Failed" : (status === "TODO"? "In Progress": "Achieved")}</Typography>
        </Stack>
    );
}

const StatusCell = ({data}) => {
    if(data.status === "DONE"){
        return(
            <Chip
                label="DONE"
                sx={{
                    backgroundColor: green[600],
                    color: "white",
                    borderRadius: "20px", // pill shape
                }}
                />
        );
    }

    return(
            <Chip
                label="TODO"
                sx={{
                    backgroundColor: orange[600],
                    color: "white",
                    borderRadius: "20px", // pill shape
                }}
                />
        );
    
}

export default function TaskItems({data}){
    return(
        <TableRow key={data._id}>
            <TableCell>{data.title}</TableCell>
            <TableCell>{data.description}</TableCell>
            <TableCell> <DeadlineCell deadline={data.deadline} status={data.status} /> </TableCell>
            <TableCell> <StatusCell data={data} /> </TableCell>
            <TableCell> <TaskActions task={data} /> </TableCell>
        </TableRow>
    );
}