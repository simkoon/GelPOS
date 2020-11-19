import styled, { css, keyframes } from "styled-components";

export const onBtn = keyframes`
  
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-1100px);
  }

`;

export const offBtn = keyframes`
  
  from {
    transform: translateX(-1100px);
  }
  to {
    transform: translateX(0px);
  }

`;

export const MainContainer = styled.div`
  padding-left: 200px;
  transition: all 3s linear;
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
