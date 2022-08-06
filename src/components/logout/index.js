import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Navigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from '../../reducer/user'

const Logout = () => {
    const user = useSelector((state) => state.user.current)
    const isLogin = user?.accessKey || false;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logOut());
        navigate('/');
    }

    return (
        <>
            {!isLogin && <Navigate to='/' />}
            {isLogin &&
                <IconButton aria-label='logout' onClick={logout}>
                    <LogoutIcon />
                </IconButton>
            }
        </>
    )
}
export default Logout;