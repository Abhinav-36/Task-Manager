import './App.css';
import CreateButton from './Buttons/CreateButton';
import Navbar from './components/Navbar';
import TaskTable from './components/TaskView/TaskTable';
import ModalForm from './components/ModalForm';
import { SnackbarProvider } from 'notistack';
import { LoadingIndicator } from './components/LoadingIndicator';
import { useTasks } from './CustomHooks/useTasks';


function App() {
  const {loading, refreshTasks} = useTasks();

  return (
    <SnackbarProvider autoHideDuration={3000} >
          <Navbar/>
          {loading ? <LoadingIndicator /> : <TaskTable />}
          <CreateButton />
          <ModalForm  refreshTasks={refreshTasks}/>
    </SnackbarProvider>
    
  );
}

export default App;
