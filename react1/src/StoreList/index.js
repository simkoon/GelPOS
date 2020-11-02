import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import styled from 'styled-components';


const Container = styled.div`
    width: 1000px;
`
;
function StoreList(){
    return (
        <Container className="m-auto mt-lg-5">
            <BootstrapTable>
                <TableHeaderColumn dataField='id' isKey>가게이름</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>사업자등록번호</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>주소</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>사업자이름</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>가게아이디</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>이메일</TableHeaderColumn>
                <TableHeaderColumn dataField='price'>만료일</TableHeaderColumn>
            </BootstrapTable>
        </Container>
    )
}


export default StoreList;