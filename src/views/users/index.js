import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Layout from '../../components/layout';
import UserData from '../../data/users.json'
import Filter from '../../components/filter';
import { formatDate } from '../../utils/format';

const Users = () => {
    const roles = [];
    const [users, setUsers] = useState(UserData.users);

    (function getRoles() {
        UserData.users.forEach((u) => {
            if (!roles.find((r) => (r === u.role))) roles.push(u.role);
        })
    })();

    const [role, setRole] = useState(roles);

    const handleChange = (e) => {
        if (e.target.value.length > 0) {
            setRole(e.target.value);
            setUsers(UserData.users.filter((user) => (e.target.value.find((r) => (r === user.role)))));
        }
    };

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

    return (
        <Layout>
            <div className="filters">
                <Filter
                    data={roles}
                    value={role}
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