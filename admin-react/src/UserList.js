import React from 'react';
import AdminContainer from './components/Container';
import AsideMenu from './components/AsideMenu';
import 'bootstrap/dist/css/bootstrap.css';
import UserListContainer from './components/Userlist/UserListContainer';
import PaginationContainer from './components/Userlist/PaginationContainer';

const UserList = () => {
    return(
        <>
            <AdminContainer>
                <AsideMenu/>
                <UserListContainer/>
                {/* <PaginationContainer/> */}
            </AdminContainer>
        </>
    )
}

export default UserList;