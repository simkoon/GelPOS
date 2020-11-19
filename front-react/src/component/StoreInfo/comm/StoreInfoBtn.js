import React from "react";
import { Button, Col } from "react-bootstrap";
import styled, { css } from "styled-components";

const ButtonBox = styled.div`
  margin-top: 15vh;
  margin-left: 140px;

  .btn1_size_color {
    box-sizing: border-box;
    background-color: rgb(92, 110, 136);
    width: 300px;
    height: 70px;
    border-radius: 28px;
    font-size: 20px;
    border: none;

    &:hover {
      background-color: rgb(52, 70, 96);
    }
    &:focus {
      background-color: rgb(52, 70, 96) !important;
    }
  }
  .btn2_size_color {
    box-sizing: border-box;
    background-color: rgb(100, 100, 100);
    width: 300px;
    height: 70px;
    border-radius: 28px;
    font-size: 20px;
    border: none;

    &:hover {
      background-color: rgb(60, 60, 60);
    }
    &:focus {
      background-color: rgb(60, 60, 60) !important;
    }
  }
  .btn1_size_color:hover {
    background-color: rgb(52, 70, 96);
  }
  .btn2_size_color:hover {
    background-color: rgb(60, 60, 60);
  }
`;
function StoreInfoBtn({ onBtnClick, isPage }) {
  return (
    <>
      <Col lg={5} sm={4}>
        <ButtonBox isPage={isPage}>
          <Button
            className="btn1_size_color "
            value="MenuAdd"
            onClick={onBtnClick}
          >
            메뉴 추가
          </Button>
          <Button
            className="btn1_size_color mt-3"
            value="MenuUpDel"
            onClick={onBtnClick}
          >
            메뉴 수정 ● 삭제
          </Button>
          <Button
            className="btn2_size_color mt-5"
            value="CategoryAdd"
            onClick={onBtnClick}
          >
            카테고리 추가
          </Button>
          <Button
            className="btn2_size_color mt-3"
            value="CategoryUpDel"
            onClick={onBtnClick}
          >
            카테고리 수정 ● 삭제
          </Button>
          <Button
            className="btn2_size_color mt-3"
            value="MenuAdd"
            onClick={onBtnClick}
          >
            문의 보내기 할까요말까요
          </Button>
        </ButtonBox>
      </Col>
    </>
  );
}

export default StoreInfoBtn;
