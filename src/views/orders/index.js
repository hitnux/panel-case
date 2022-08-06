import { useState } from 'react';
import { useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout';
import Filter from '../../components/filter'

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'user',
        headerName: 'Name Surname',
        width: 200,
        valueGetter: (user) => `${user.value.name} ${user.value.surname}`
    },
    {
        field: 'date',
        headerName: 'Registration Date',
        width: 200,
        valueGetter: (data) => new Date(data.value).toLocaleDateString("tr-TR")
    },
    { field: 'state', headerName: 'Status', width: 150 },
    {
        field: 'total',
        headerName: 'Total',
        width: 200,
        valueGetter: (data) => `${data.value.toFixed(2).replace('.', ',')} TL`
    },
    {
        field: 'detail',
        headerName: 'Detail',
        width: 120,
        cellClassName: 'ShowDetail',
        valueGetter: () => 'Show More'
    }
];

const Orders = () => {
    const orders = useSelector((state) => state.orders.value)
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState(orders);
    let status = [];

    orders.forEach((value) => {
        if (!status.includes(value.state)) status = [...status, value.state]
    });

    const filterChange = (e) => {
        setOrderList(orders.filter(order => (e.target.value.find(v => v === order.state))));
    }

    const cellClick = (e) => {
        if (e.field === 'detail') {
            navigate(`/order/${e.id}`);
        }
    }

    return (
        <Layout>
            <Filter
                data={status}
                value={status}
                label="Status"
                tabs={true}
                onChange={filterChange}
            />
            <Box sx={{
                height: '79vh', width: '100%',
                '& .ShowDetail': {
                    color: '#1976d2',
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer'
                },
            }}>
                <DataGrid
                    rows={orderList}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                    onCellClick={cellClick}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'state', sort: 'desc' }],
                        }
                    }}
                />
            </Box>
        </Layout>
    )
}
export default Orders;