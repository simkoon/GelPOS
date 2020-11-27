import React from 'react';
import AdminContainer from './components/Container';
import AsideMenu from './components/AsideMenu';
import 'bootstrap/dist/css/bootstrap.css';
import StoreListContainer from './components/Storelist/StoreListContainer';

const StoreList = () => {
    return(
        <>
            <AdminContainer>
                <AsideMenu/>
                <StoreListContainer/>
            </AdminContainer>
        </>
    )
}

export default StoreList;