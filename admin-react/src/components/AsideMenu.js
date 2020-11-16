import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";

const Aside = styled.div`
  width: 25vh;
  height: 100vh;
  background-color: gray;
  float: left;

  div {
    display: flex;
    height: 25%;
    border-left: none !important;
    flex-direction: column;
    justify-content: space-around;
  }

  div p {
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0;
  }

  div:hover p {
    text-shadow: 2px 2px black;
  }

  div:hover {
    cursor: pointer;
  }
`;

function AsideMenu() {
  return (
    <Aside>
      <div className="border border-secondary">
        <p>가게 리스트</p>
      </div>
      <div className="border border-secondary">
        <p>문의 내역</p>
      </div>
      <div className="border border-secondary">
        <p>승인 가게 대기 리스트</p>
      </div>
      <div className="border border-secondary">
        <p>유저 리스트</p>
      </div>
    </Aside>
  );
}

export default AsideMenu;
