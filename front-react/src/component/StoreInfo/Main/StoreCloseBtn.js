import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const CloseButton = styled(Button)`
  box-sizing: border-box;
  background-color: rgb(60, 50, 60);
  width: 300px;
  height: 110px;
  border-radius: 28px;
  font-size: 20px;
  border: none;
  margin-top: 100px;
  margin-left: 140px;

  &:hover {
    background-color: rgb(30, 20, 30);
  }
  &:focus {
    background-color: rgb(60, 50, 60) !important;
  }
`;
function StoreCloseBtn() {
  return (
    <>
      <CloseButton className="btn2_size_color ">마감하기</CloseButton>
    </>
  );
}

export default StoreCloseBtn;
