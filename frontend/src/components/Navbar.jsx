import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
    return (
        <AppBar position='static' >
            <Toolbar>
                <Typography variant='h5' color='secondary'>Task Manager</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;