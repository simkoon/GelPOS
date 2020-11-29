import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const ULT = styled.div`
  width: 100%;
  height: 100vh;

  h2 {
    text-align: center;
    margin-bottom: 40px;
    font-weight: bold;
  }

  .table tbody tr td button {
    font-weight: bold;
    font-size: 12px;
  }

  .table tbody tr td {
    vertical-align: middle !important;
  }

  .test {
    margin-top: 125px;
  }
`;

function StoreListTable({ user }) {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [storeData, setStoreData] = useState([]);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }

  function setRowData() {
    const resultArray = [];
    if (user) {
      user.forEach((users) => {
        users.store.forEach((store) => {
          const eachStore = {
            userid: users.userid,
            username: users.username,
            useremail: users.email,

            storename: store.name,
            storeadd: store.address,
            storepubdate: store.publishedDate.substring(0, 10),
          };
          resultArray.push(eachStore);
        });
      });
      setStoreData(() => {
        return resultArray;
      });
    }
  }

  useEffect(() => {
    console.log('되나요?');
    setRowData();
  }, [user]);

  return (
    <ULT>
      <Container fluid>
        <Row>
          <Col md={{ span: 10, offset: 1 }} className="test">
            <h2>가게 리스트</h2>
            <div
              className="ag-theme-alpine"
              style={{
                height: 600,
                width: '100%',
              }}
            >
              <AgGridReact
                overlayNoRowsTemplate="<p>가게 정보가 없습니다</p>"
                rowData={storeData}
                paginationAutoPageSize={true}
                pagination={true}
                rowSelection="single"
                onGridReady={onGridReady}
              >
                <AgGridColumn
                  field="storename"
                  headerName={'가게명'}
                  resizable={true}
                />
                <AgGridColumn
                  field="username"
                  headerName={'점주명'}
                  resizable={true}
                />
                <AgGridColumn
                  field="userid"
                  headerName={'점주 아이디'}
                  resizable={true}
                />
                <AgGridColumn
                  field="useremail"
                  headerName={'점주 이메일'}
                  resizable={true}
                />
                <AgGridColumn
                  field="storeadd"
                  headerName={'가게 주소'}
                  resizable={true}
                />
                <AgGridColumn
                  field="storepubdate"
                  headerName={'등록날짜'}
                  resizable={true}
                />
              </AgGridReact>
            </div>
          </Col>
        </Row>
      </Container>
    </ULT>
  );
}

export default StoreListTable;