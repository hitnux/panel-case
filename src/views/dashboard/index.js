import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Layout from '../../components/layout';
import { allOrders } from '../../store/reducers/orders';
import { formatCurrency } from '../../utils/format';
import { getAllUsers } from '../../store/reducers/user'
import './index.scss';

const DashboardContainer = ({ orders }) => {
    const users = useSelector((state) => state.user.users);

    let totalValue = 0;

    orders.forEach(o => {
        totalValue += o.total
    })

    const data = [
        {
            id: 1,
            name: 'Toplam Ciro',
            value: formatCurrency(totalValue)
        },
        {
            id: 2,
            name: 'Toplam Kullanıcı',
            value: users.length
        },
        {
            id: 3,
            name: 'Toplam Sipariş',
            value: orders.length
        },
        {
            id: 4,
            name: 'Yeni Sipariş',
            value: orders.filter(o => o.state === 'New').length
        },
        {
            id: 5,
            name: 'Yolda Olan Sipariş',
            value: orders.filter(o => o.state === 'Process').length
        },
        {
            id: 6,
            name: 'Tamamlanmış Sipariş',
            value: orders.filter(o => o.state === 'Completed').length
        }
    ]

    return (
        <div className='card-container'>
            {data.map((d) =>
                <div key={`card${d.id}`} className='card'>
                    <div className='card__title'>{d.name}</div>
                    <div className='card__body'>{d.value}</div>
                </div>
            )}
        </div>
    )
}

const Dashboard = () => {
    const orders = useSelector((state) => state.orders.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allOrders());
        dispatch(getAllUsers());
    });

    return (
        <Layout>
            {orders.length > 0 && <DashboardContainer orders={orders} />}
        </Layout>
    )
}

export default Dashboard;