import React from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import InfoTitleImg from "../Image/InfoTitle.png";

const InfoTextBox = styled.div`
  font-weight: bold;
  line-height: 30px;

  hr {
    margin-left: 1px;
    color: black;
    width: 40vh;
  }
`;

const InfoText = styled.span`
  color: rgb(0, 0, 0);
  font-weight: bold;
  margin-right: 20px;
  font-size: 20px;
`;

const StoreTextBox = styled.div`
  color: rgb(66, 84, 102);
  margin-top: 15vh;
  line-height: 8px;
`;
const InfoTitle = styled.div`
  font-size: 25px !important;
  margin-bottom: 80px;
  right: 50px;
  img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
  }
`;
const InfoIcon = styled.span`
  margin-left: 3vh;
  font-size: 25px !important;
`;
function StInfomation({
  storeName,
  storeAddress,
  storeRegNumber,
  storeExPiredDate,
}) {
  return (
    <>
      <Col>
        <StoreTextBox>
          <InfoTitle>
            <h3>
              <img src={InfoTitleImg} className="mr-3" />
              가게 정보
            </h3>
          </InfoTitle>
          <InfoTextBox>
            <p>
              <InfoIcon>● </InfoIcon>
              <InfoText>가게이름 </InfoText>
              {storeName}
            </p>
            <hr />
            <p>
              <InfoIcon>● </InfoIcon>
              <InfoText>가게 주소 </InfoText>
              {storeAddress}
            </p>
            <hr />
            <p>
              <InfoIcon>● </InfoIcon>
              <InfoText>사업자등록번호 </InfoText>
              {storeRegNumber}
            </p>
            <hr />
            <p>
              <InfoIcon>● </InfoIcon>
              <InfoText>가입 날짜 </InfoText>
              {storeExPiredDate}
            </p>
            <hr />
          </InfoTextBox>
        </StoreTextBox>
      </Col>
    </>
  );
}

export default StInfomation;
