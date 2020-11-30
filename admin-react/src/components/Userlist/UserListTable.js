import React, { useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import AskRemove from "./AskRemove";
import { removeUser } from "../../lib/api/userlist";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const ULT = styled.div`
  width: 100%;
  height: 100vh;

  h2 {
    text-align: center;
    margin-bottom: 40px;
    font-weight: bold;
  }

  .table tbody tr td {
    vertical-align: middle !important;
  }

  .test {
    margin-top: 125px;
  }

  .oribos {
    width: 160px;
    height: 40px;
    margin-top: 20px;
    margin-left: 300px;
  }
`;

function UserListTable({ user, loading }) {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [selData, setSelData] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }

  const onButtonClick = async (e) => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    console.log(selectedData[0]);
    setSelData(selectedData[0]._id);
  };

  const RemoveButton = ({ users }) => {
    console.log(selData);
    const userid = selData;
    const [modal, setModal] = useState(false);
    const onRemoveClick = () => {
      setModal(true);
    };
    const onCancel = () => {
      setModal(false);
    };
    const onConfirm = () => {
      setModal(false);
      onRemove();
    };

    const onRemove = async () => {
      try {
        await removeUser(userid);
        window.location.href = "http://localhost:9090/UserList";
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <>
        <button className="btn btn-light oribos" onClick={onRemoveClick}>
          탈퇴
        </button>
        <AskRemove visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
      </>
    );
  };

  console.log("유저ㅓ어어~~~~~~~~~~~~");
  console.log(user);
  return (
    <ULT>
      <Container fluid>
        <Row>
          <Col md={{ span: 8, offset: 2 }} className="test">
            <h2>유저 리스트</h2>
            <div
              className="ag-theme-alpine"
              style={{
                height: 600,
                width: "100%",
              }}
            >
              <AgGridReact
                overlayNoRowsTemplate="<p>유저 정보가 없습니다</p>"
                rowData={user}
                paginationAutoPageSize={true}
                pagination={true}
                rowSelection="single"
                onSelectionChanged={onButtonClick}
                onGridReady={onGridReady}
              >
                <AgGridColumn
                  field="userid"
                  headerName={"아이디"}
                  resizable={true}
                />
                <AgGridColumn
                  field="username"
                  headerName={"이름"}
                  resizable={true}
                />
                <AgGridColumn
                  field="email"
                  headerName={"이메일"}
                  resizable={true}
                />
                <AgGridColumn
                  field="publishedDate"
                  headerName={"가입일자"}
                  resizable={true}
                />
                <AgGridColumn
                  field="userid"
                  headerName={"유저 아이디"}
                  resizable={true}
                />
              </AgGridReact>
            </div>
            <RemoveButton />
          </Col>
        </Row>
      </Container>
    </ULT>
  );
}

export default UserListTable;
