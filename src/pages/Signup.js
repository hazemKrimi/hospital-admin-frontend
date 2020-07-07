import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import { MainContext } from '../contexts/MainContext';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default () => {
    const classes = useStyles();
    const { user, signup } = useContext(MainContext);
    const history = useHistory();

    const form = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required('Username is required'),
            email: Yup.string().required('Email is required').email('Email is invalid'),
            password: Yup.string().required('Password is required').min(6, 'Password is 6 characters minimum'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords don\'t match')
        }),
        onSubmit: async({ username, email, password }, { setFieldError }) => {
            try {
                await signup(username, email, password);
                history.push('/patients');
            } catch (err) {
                setFieldError('signup', err.message);
            }
        }
    });

    return (
        <>
            {
                !user ?
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Signup
                        </Typography>
                        <form className={classes.form} onSubmit={form.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={form.values.username}
                                error={form.errors.username && form.touched.username}
                                helperText={form.errors.username && form.errors.username}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={form.values.email}
                                error={form.errors.email && form.touched.email}
                                helperText={form.errors.email && form.errors.email}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={form.values.password}
                                error={form.errors.password && form.touched.password}
                                helperText={form.errors.password && form.errors.password}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                value={form.values.confirmPassword}
                                error={form.errors.confirmPassword && form.touched.confirmPassword}
                                helperText={form.errors.confirmPassword && form.errors.confirmPassword}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Signup
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
                : <Redirect to='/patients' />
            }
        </>
    );
}