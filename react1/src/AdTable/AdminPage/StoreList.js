import React from 'react';
import AdminContainer from './components/Container';
import AsideMenu from './components/AsideMenu';
import StoreListTable from './components/StoreListTable';
import 'bootstrap/dist/css/bootstrap.css';

const AdStoreList = () => {
    return(
        <>
            <AdminContainer>
                <AsideMenu/>
                <StoreListTable/>
            </AdminContainer>
        </>
    )
}

export default AdStoreList;