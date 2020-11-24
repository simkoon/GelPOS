import React from "react";
import { Col } from "react-bootstrap";
import InfoTitleImg from "../Image/InfoTitle.png";
import {
  InfoTextBox,
  InfoText,
  StoreTextBox,
  InfoTitle,
  InfoIcon,
} from "../CSS/MainCss";

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
