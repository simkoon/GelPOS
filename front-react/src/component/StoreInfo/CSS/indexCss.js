import styled, { css, keyframes } from "styled-components";

export const onBtn = keyframes`
  
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-1600px);
  }

`;

export const offBtn = keyframes`
  
  from {
    transform: translateX(-1600px);
  }
  to {
    transform: translateX(0px);
  }

`;

export const MainContainer = styled.div`
  height: 100vh;
  padding-left: 200px;
  transition: all 2s linear;
  ${(props) =>
    props.Animation === "true" &&
    css`
      animation-duration: 1s;
      animation-timing-function: ease-out;
      animation-name: ${onBtn};
      animation-fill-mode: forwards;
    `};
  ${(props) =>
    props.Animation === "false" &&
    css`
      animation-duration: 1s;
      animation-timing-function: ease-out;
      animation-name: ${offBtn};
      animation-fill-mode: forwards;
    `};
`;
