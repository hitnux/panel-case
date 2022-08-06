import { useSelector } from 'react-redux';
import Layout from '../../components/layout';
import UsersData from '../../data/users.json';
import './index.scss';

const DashboardContainer = ({ orders }) => {
    let totalValue = 0;

    orders?.forEach(o => {
        totalValue += o.total
    })

    const data = [
        {
            id: 1,
            name: 'Toplam Ciro',
            value: `${totalValue.toFixed(2).replace('.', ',')} TL`
        },
        {
            id: 2,
            name: 'Toplam Kullanıcı',
            value: UsersData.users.length
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
    const orders = useSelector((state) => state.orders.value)

    return (
        <Layout>
            {orders.length > 0 && <DashboardContainer orders={orders} />}
        </Layout>
    )
}

export default Dashboard;