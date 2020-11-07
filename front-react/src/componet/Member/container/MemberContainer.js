import React from "react";
import styled from "styled-components";
import backimg from "../image/log_background.png";

const Container = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  background-image: url(${backimg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 230px;
`;
function MemberContainer({ children }) {
  return <Container>{children}</Container>;
}

export default MemberContainer;
