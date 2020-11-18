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

function UserListTable({userid, username, email}) {

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
                  <tr>
                    {/* <th scope="row">1</th>
                    <td>{user.userid}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td> */}
                    <td>{new Date().toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-light">탈퇴</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>banana</td>
                    <td>반하나</td>
                    <td>www.daum.net</td>
                    <td>2020-10-18</td>
                    <td>
                      <button className="btn btn-light">탈퇴</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>orange</td>
                    <td>오렌지</td>
                    <td>www.google.com</td>
                    <td>2020-10-18</td>
                    <td>
                      <button className="btn btn-light">탈퇴</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>avocado</td>
                    <td>안복도</td>
                    <td>www.email.com</td>
                    <td>2020-10-18</td>
                    <td>
                      <button className="btn btn-light">탈퇴</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>peach</td>
                    <td>황복숭</td>
                    <td>www.kimmail.com</td>
                    <td>2020-10-18</td>
                    <td>
                      <button className="btn btn-light">탈퇴</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>jok</td>
                    <td>조옥상</td>
                    <td>www.rooftop.com</td>
                    <td>2020-10-18</td>
                    <td>
                      <button className="btn btn-light">탈퇴</button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>Damwon</td>
                    <td>킹담원</td>
                    <td>www.dwg.com</td>
                    <td>2020-10-18</td>
                    <td>
                      <button className="btn btn-light">탈퇴</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </Container>
      
    </ULT>
  );
}

export default UserListTable;
