import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';

const AdCon = styled.div`
    width: 100%;
    height: 100vh;
    background-color: lightgray;
    margin: 0 auto;
`;

function AdminContainer({children}) {
    return(
        <AdCon>       
            {children}
        </AdCon>
    )
};

export default AdminContainer;