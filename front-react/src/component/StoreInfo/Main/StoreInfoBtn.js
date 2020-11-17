import React from "react";
import { Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const ButtonBox = styled.div`
    margin-top: 15vh;
    margin-left: 140px;

    .btn1_size_color{
        box-sizing: border-box;
        background-color: rgb(92,110,136);
        width:300px;
        height:70px;
        border-radius: 28px;
        font-size: 20px;
        border: none;
    }
    .menuUpdate{
    
    }
    .btn2_size_color{
        box-sizing: border-box;
        background-color: rgb(124,164,224);
        width:300px;
        height:110px;
        border-radius: 28px;
        font-size: 20px;
        border: none;
        margin-top:100px;
    }
    .btn1_size_color:hover{
        background-color: rgb(52,70,96);
    }
    .btn2_size_color:hover{
        background-color: rgb(84,124,184);
    }
`
;

function StoreInfoBtn() {
    return(
        <>
            <Col md>
            <ButtonBox>
                <Button className="btn1_size_color menuUpdate">메뉴 수정</Button>
                <Button className="btn1_size_color mt-5">문의 보내기</Button>
                <Button className="btn2_size_color ">마감하기</Button>
            </ButtonBox>
            </Col>
        </>
    );
}

export default StoreInfoBtn;