import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";

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

const TableItem = ({users, index}) => {
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{users.userid}</td>
        <td>{users.username}</td>
        <td>{users.email}</td>
        <td>{new Date().toLocaleDateString()}</td>
        <td>
          <button className="btn btn-light">탈퇴</button>
        </td>
      </tr>
    )
}

function UserListTable({ user, loading, error }) {
  return (
    <ULT>    
        <Container fluid>
          <Row>
            <Col md={{ span:8, offset: 2}} className="test">
              <h2>유저 리스트</h2>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">아이디</th>
                    <th scope="col">이름</th>
                    <th scope="col">이메일</th>
                    <th scope="col">가입일자</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && user && (
                    <>
                    {user.reverse().map((users, index) => (
                      <TableItem users={users} key={users._id} index={index}/>
                    ))} 
                    </>        
                  )}          
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      
    </ULT>
  );
}

export default UserListTable;
