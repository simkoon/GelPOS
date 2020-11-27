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

const TableItem = ({users, index, store}) => {
    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{store.name}</td>
            <td>{users.userid}</td>
            <td>{users.username}</td>
            <td>{users.email}</td>
            <td>{store.address}</td>
            <td>{store.publishedDate.toString().replace("T"," ").substring(0, 16)}</td>
          </tr>
    )
}

function StoreListTable({ user, loading}) {
  let count = 0;
  return (
    <ULT>    
        <Container fluid>
          <Row>
            <Col md={{ span:8, offset: 2}} className="test">
              <h2>가게 리스트</h2>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">가게명</th>
                    <th scope="col">점주 아이디</th>
                    <th scope="col">점주 이름</th>
                    <th scope="col">이메일</th>
                    <th scope="col">가게주소</th>
                    <th scope="col">등록일자</th>
                  </tr>
                </thead>
                <tbody>
                  { !loading && user && (
                    <>
                    {user.reverse().map((users) => 
                        {                       
                        return (users.store.map((store, index) => {
                            count++;
                        return (<TableItem users={users} key={index} index={count} store={store} />)
                        }))                   
                        }
                    )} 
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

export default StoreListTable;
