import React from 'react';
import styled from 'styled-components';
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
box-shadow : 10px 10px 20px rgba(0, 0, 0, 0.05);`
;


function IdPassFindBox({ children }){
    return (
            <Box>
                {children}
            </Box>
    )
}


export default IdPassFindBox;