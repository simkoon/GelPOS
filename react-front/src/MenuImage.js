import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import tableImg from './sideImg/tables.png';
import storeImg from './sideImg/storeInfo.png';
import salesImg from './sideImg/sales.png';
import scheduleImg from './sideImg/schedule.png';
import tableWhiteImg from './sideImg/tablesWhite.png';
import storeWhiteImg from './sideImg/storeInfoWhite.png';
import salesWhiteImg from './sideImg/salesWhite.png';
import scheduleWhiteImg from './sideImg/scheduleWhite.png';
//background-image : url(${selImg});
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

function MenuImage({ selImg, hoverImg, pageMenu }) {
    //console.log(selImg);
    let image;
    const [isHover, setImgHover] = useState(false);
    console.log(pageMenu);
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
        <Img
            imgHover={isHover}
            setImgHover={setImgHover}
            src={image}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
        ></Img>
    );
}

export default MenuImage;
