import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StoreTextBox = styled.div`   
    color: rgb(66, 84, 102);
    margin-top: 15vh;
    line-height: 8px;
    
`
;

const InfoTitle = styled.div`
    font-size: 25px !important;
    margin-bottom: 150px;
    right: 50px;
`
;

const InfoTitleIcon = styled.div`
    width: 25px;
    height: 25px;
    display: inline-block;
    background-image: url(${require('./StoreImg/InfoTitle.png')});
    background-repeat : no-repeat;
    background-size : 100% 100%;
`
;

const InfoText = styled.div`

`
;

const InfoIcon = styled.span`
    margin-left: 3vh;
    font-size: 25px !important; 
`
;

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


function Information(){
    return (
        <>
            <div
            style={{ height: '100%', maxWidth: '1400px' }}
            className="align-items-center mx-auto"
            >
                <Row className="w-100" style={{ flex: 1 }}>
                    <Col md>
                        <StoreTextBox>
                            <InfoTitle>
                                <h3>
                                    <InfoTitleIcon className="mr-2"/>가게 정보
                                </h3>
                            </InfoTitle>
                            <InfoText>
                                <p><InfoIcon>●  </InfoIcon> 써브웨이 별내점 (가게이름)</p>
                                <p><InfoIcon>●  </InfoIcon> 남양주시 별내동 (가게주소)</p>
                                <p><InfoIcon>●  </InfoIcon> 010-1111-1111 (전화번호)</p>
                                <p><InfoIcon>●  </InfoIcon> 1234-13123  (사업자번호)</p>
                            </InfoText>
                        </StoreTextBox>
                    </Col>
                    <Col md>
                    <ButtonBox>
                        <Button className="btn1_size_color menuUpdate">메뉴 수정</Button>
                        <Button className="btn1_size_color mt-5">문의 보내기</Button>
                        <Button className="btn2_size_color ">마감하기</Button>
                    </ButtonBox>
                    </Col>
                </Row>
            </div>
        </>
    )
}


export default Information;