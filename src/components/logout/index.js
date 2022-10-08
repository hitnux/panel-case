import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Navigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import { logOut } from '../../reducer/user'
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
    const isLogin = useSelector((state) => state.user.isLogin)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logOut());
        navigate('/');
    }

    if (!isLogin) return <Navigate to='/' />

    return (
        <IconButton aria-label='logout' onClick={logout}>
            <LogoutIcon />
        </IconButton>
    )
}
export default Logout;