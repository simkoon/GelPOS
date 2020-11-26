import React, { useState } from "react";
import styled, { css } from "styled-components";
//background-image : url(${selImg});
const MenuBtnBox = styled.div`
  text-decoration: none;
`;

const imgStyles = css`
  ${(selImg) => {
    console.log(selImg);

    return css`
      background-image: url(${selImg});
    `;
  }}
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 auto;
  display: block;
`;

function MenuImage({ selImg, hoverImg, pageMenu, children }) {
  let image;
  const [isHover, setImgHover] = useState(false);
  if (pageMenu) {
    image = hoverImg;
  } else {
    if (!isHover) {
      image = selImg;
    } else if (isHover) {
      image = hoverImg;
    }
  }

  const mouseOver = () => {
    setImgHover(!isHover);
  };

  const mouseOut = () => {
    setImgHover(!isHover);
  };

  return (
    <MenuBtnBox onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <Img imgHover={isHover} setImgHover={setImgHover} src={image}></Img>
      {children}
    </MenuBtnBox>
  );
}

export default MenuImage;
