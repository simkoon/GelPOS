import React from 'react';
import AdminContainer from './components/Container';
import AsideMenu from './components/AsideMenu';
import 'bootstrap/dist/css/bootstrap.css';
import UserListContainer from './components/Userlist/UserListContainer';

const UserList = () => {
    return(
        <>
            <AdminContainer>
                <AsideMenu/>
                <UserListContainer/>
            </AdminContainer>
        </>
    )
}

export default UserList;