import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { setOrders } from '../../reducer/orders';
import PageAccess from '../../utils/access'
import Logout from '../logout';
import PageData from '../../data/pages.json'
import OrderData from '../../data/orders.json';

const Layout = ({ children }) => {
    const user = useSelector((state) => state.user.current);
    const orders = useSelector((state) => state.orders.value)
    const access = PageAccess(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setOrders(OrderData.orders));
    });

    const icons = {
        HomeIcon,
        PeopleAltIcon,
        ShoppingBasketIcon
    }

    const getIcon = (icon) => {
        const IconComponent = icons[icon];
        return (
            <IconComponent />
        )
    };

    const goHome = () => {
        navigate('/dash');
    }

    return (
        <div>
            {!access && <Navigate to="/" />}
            {access &&
                <>
                    <header className="flex">
                        <h1 onClick={goHome}>H</h1>
                        <ul>
                            <li className='user'><span>Hoşgeldin <b>{user.name}</b></span></li>
                            {PageData.pages.map((page) =>
                                (page.showMenu && page.access.find(r => (r === user.role))) &&
                                <li key={page.name} className={window.location.pathname === page.path ? 'active' : ''}>
                                    <IconButton aria-label={page.name} onClick={() => { navigate(page.path) }}>
                                        {getIcon(page.icon)}
                                    </IconButton>
                                </li>
                            )}
                            <li><Logout /></li>
                        </ul>
                    </header>
                    <main>
                        {orders.length > 0 && children}
                    </main>
                </>
            }
        </div>
    )
}

export default Layout;