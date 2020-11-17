import React from "react";
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import InfoTitleImg from '../Image/InfoTitle.png'; 

const StoreTextBox = styled.div`   
    color: rgb(66, 84, 102);
    margin-top: 15vh;
    line-height: 8px;
    
`
;
const InfoTitle = styled.div`
    font-size: 25px !important;
    margin-bottom: 80px;
    right: 50px;
    img{
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
    }
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

function StInfomation() {
    return(
        <>
            <Col>
                <StoreTextBox>
                    <InfoTitle>
                        <h3>
                            <img src={InfoTitleImg} className="mr-3"/>가게 정보
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
        </>
    );
}

export default StInfomation;