import { useSelector, useDispatch } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatCurrency } from '../../utils/format';
import Layout from '../../components/layout';
import Filter from '../../components/filter'
import { setFilters } from '../../store/reducers/orders'

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
        valueGetter: (data) => formatDate(data.value)
    },
    { field: 'state', headerName: 'Status', width: 150 },
    {
        field: 'total',
        headerName: 'Total',
        width: 200,
        valueGetter: (data) => formatCurrency(data.value)
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
    const list = useSelector((state) => state.orders.list)
    const filters = useSelector((state) => state.orders.filters)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const filterChange = (e) => {
        dispatch(setFilters(e.target.value));
    }

    const cellClick = (e) => {
        if (e.field === 'detail') navigate(`/order/${e.id}`);
    }

    return (
        <Layout>
            <Filter
                data={filters}
                value={filters}
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
                    rows={list}
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
