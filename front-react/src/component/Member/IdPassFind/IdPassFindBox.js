import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Fade } from "react-bootstrap";
//import "./container.scss";

const Box = styled.div`
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 32px;
  width: 600px;
  height: 450px;
  margin: 0 auto;
  text-align: center;
  padding-top: 40px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05);
`;
function IdPassFindBox({ children }) {
  const [view, setView] = useState(false);

  useEffect(() => {
    setView(true);
  });

  return (
    <Fade in={view}>
      <Box>{children}</Box>
    </Fade>
  );
}

export default IdPassFindBox;
