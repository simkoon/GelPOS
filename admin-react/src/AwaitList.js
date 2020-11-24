import React from 'react';
import AdminContainer from './components/Container';
import AsideMenu from './components/AsideMenu';

const AwaitList = () => {
    return(
        <>
            <AdminContainer>
                <AsideMenu/>
                <p>준비중입니다</p>
            </AdminContainer>
        </>
    )
}

export default AwaitList;