import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TaskItems from './TaskItems';
import { Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { TaskContext } from '../../Context/TaskContext';



export default function TaskTable() {
  const {tasks} = useContext(TaskContext);
  if (tasks.length === 0) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 10,
        }}
      >
        <Typography variant="h5" color="text.secondary">
          No tasks found!
        </Typography>
      </Box>
    );
  }
  return (
        <TableContainer component={Paper} sx={{
            minWidth: 650,
            marginY: 4,
            marginX: 20,
            width: "auto"}}>
          <Table aria-label="simple table">
            <TableHead sx={{fontWeight: 600}}>
              <TableRow sx={{fontWeight: 600}}>
                <TableCell>Title</TableCell>
                <TableCell  align="left">Description</TableCell>
                <TableCell align="left">Deadline</TableCell>
                <TableCell align="centre">Status</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TaskItems key={task._id} data={task} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  );
}