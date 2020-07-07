import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MainContext } from '../contexts/MainContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Nav = () => {
    const classes = useStyles();
    const { user, logout } = useContext(MainContext);
    const history = useHistory();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Hospital Admin
                    </Typography>
                        {
                            user ? (
                                <>
                                    <Button color="inherit" onClick={() => history.push('/patients')}>Patients</Button>
                                    <Button color="inherit" onClick={() => history.push('/rdv')}>Rendezvous</Button>
                                    <Button color="inherit" onClick={() => history.push('/ordonnances')}>Ordonnances</Button>
                                    <Button color="inherit" onClick={() => { logout(); history.push('/login') }}>Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
                                    <Button color="inherit" onClick={() => history.push('/signup')}>Signup</Button>
                                </>
                            )
                        }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Nav;