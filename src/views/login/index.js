import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { FormGroup, TextField, Button, InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import { login } from '../../reducer/user'
import './index.scss';

const Login = () => {
    const user = useSelector((state) => state.user.current);
    const dispatch = useDispatch();

    const form = {
        username: useRef(),
        password: useRef()
    };

    const getValue = (key) => {
        return form[key].current?.value || null
    }

    const accessControl = () => {
        dispatch(login({
            username: getValue('username'),
            password: getValue('password')
        }));

        if (!localStorage.getItem('accces_key')) {
            alert('error')
        }
    }

    if (user?.accessKey) {
        return (
            <section className="login">
                <Navigate to="/dash" />
            </section>
        )
    }

    return (
        <section className="login">
            <FormGroup className='login-wrapper'>
                <h1>Login</h1>
                <TextField id="username" label="Username" variant="outlined"
                    inputRef={form.username}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField id="password" label="Password" type="password" variant="outlined"
                    inputRef={form.password}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HttpsIcon />
                            </InputAdornment>
                        ),
                    }} />
                <Button variant="contained" onClick={accessControl}>Login</Button>
            </FormGroup>
        </section>
    );
}

export default Login;
