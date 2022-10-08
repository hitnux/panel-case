import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import Filter from '../../components/filter';
import { formatDate } from '../../utils/format';
import { filterUser } from '../../store/reducers/user';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'First name', width: 150 },
    { field: 'surname', headerName: 'Last name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
        field: 'created',
        headerName: 'Registration Date',
        width: 200,
        valueGetter: (data) => formatDate(data.value)
    },
    { field: 'role', headerName: 'Role', width: 200 }
];

const Users = () => {
    const users = useSelector((state) => state.user.users);
    const roles = useSelector((state) => state.user.roles);
    const [activeRole, setActiveRole] = useState(roles);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.value.length > 0) {
            setActiveRole(e.target.value);
            dispatch(filterUser(e.target.value));
        }
    };

    return (
        <Layout>
            <div className="filters">
                <Filter
                    data={roles}
                    value={activeRole}
                    label="Age"
                    onChange={handleChange}
                />
            </div>
            <Box sx={{ height: '79vh', width: '100%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Box>
        </Layout>
    )
}

export default Users;