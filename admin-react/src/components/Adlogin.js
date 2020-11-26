import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import AdminContainer from "./Container";
import 'bootstrap/dist/css/bootstrap.css';
import logo from './img/logo.png';
import {Container, Row, Col } from "react-bootstrap";

const LoginCon = styled.div`
    width: 300px;
    height: 300px;
    margin: 0 auto;
    position: relative;
    top: 33vh;

    div .logo-span {
        vertical-align: bottom;
        font-weight: bold;
        margin-left: 6px;
    }

    .input-group {
        margin-bottom: 20px !important;
    }

    a {
        text-decoration: none;
    }
`

function Adlogin() {
    return(
        
        <AdminContainer>
            <Container fluid>
            <Row className="justify-content-md-center">
                <Col>
            <LoginCon>
                <div><img src={logo}/><span className="logo-span">admin</span></div>
                <div className="input-group my-2 mb-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">ID</span>
                    </div>
                    <input type="text" name="userID" className="form-control" placeholder=""
                    aria-label="Input ID" aria-describedby="basic-addon1" required></input>
                </div>
                <div className="input-group my-2 mb-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">PW</span>
                    </div>
                    <input type="text" name="userID" class="form-control" placeholder=""
                    aria-label="Input Password" aria-describedby="basic-addon1" required></input>
                </div>
                {
                    //onClick={ (event) => event.preventDefault()}
                }
                <Link to="/UserList" ><button type="button" className="btn btn-secondary btn-lg btn-block">로그인</button></Link>
            </LoginCon>
                </Col>
            </Row>
            </Container>
        </AdminContainer>
       
    )
}



export default Adlogin;