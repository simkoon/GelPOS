import React from "react";
import styled, { css } from "styled-components";
import { Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const Aside = styled.div`
  width: 25vh;
  height: 100vh;
  background-color: ${(props) => {
    if (props.selected) {
      return "blue";
    } else {
      return "gray";
    }
  }};
  float: left;

  a {
    text-decoration: none;
  }
`;

const AsideBox = styled.div`
  display: flex;
  height: 25%;
  border-left: none !important;
  flex-direction: column;
  justify-content: space-around;

  ${(props) =>
    props.selected &&
    css`
      background-color: burlywood;
    `};

  p {
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover p {
    text-shadow: 2px 2px black;
  }
`;

function AsideMenu({ location }) {
  return (
    <Aside>
      <Link to="/UserList">
      <AsideBox
        className="border border-secondary"
        selected={(() => {
          if (location.pathname === "/UserList") {
            return true;
          } else {
            return false;
          }
        })()}
      >
        <p>유저 리스트</p>
      </AsideBox>
      </Link>
      <Link to="/adminstorelist">
      <AsideBox
        className="border border-secondary"
        selected={(() => {
          if (location.pathname === "/adminstorelist") {
            return true;
          } else {
            return false;
          }
        })()}
      >
        <p>가게 리스트</p>
      </AsideBox>
      </Link>
      <Link to="/awaitlist">
      <AsideBox
        className="border border-secondary"
        selected={(() => {
          if (location.pathname === "/awaitlist") {
            return true;
          } else {
            return false;
          }
        })()}
      >
        <p>승인 가게 대기 리스트</p>
      </AsideBox>
      </Link>
      <AsideBox
        className="border border-secondary"
        selected={(() => {
          if (location.pathname === "/inquiry") {
            return true;
          } else {
            return false;
          }
        })()}
      >
        <p>문의 내역</p>
      </AsideBox>
    </Aside>
  );
}

export default withRouter(AsideMenu);
