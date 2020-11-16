import React from 'react';
import AdminContainer from './components/Container';
import AsideMenu from './components/AsideMenu';
import UserListTable from './components/UserListTable';
import 'bootstrap/dist/css/bootstrap.css';

const UserList = () => {
    return(
        <>
            <AdminContainer>
                <AsideMenu/>
                <UserListTable/>
            </AdminContainer>
        </>
    )
}

export default UserList;