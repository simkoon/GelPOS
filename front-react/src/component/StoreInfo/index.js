import React from "react";
import { Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import StInfomation from './Main/StInformation';
import StoreInfoBtn from './Main/StoreInfoBtn';

function StoreInfo() {
    
    return(
        <>
            <div
            style={{ height: '100%', maxWidth: '1400px' }}
            className="align-items-center mx-auto"
            >
                <Row className="w-100" style={{ flex: 1 }}>
                    <StInfomation/>
                    <StoreInfoBtn/>
                </Row>
            </div>
        </>
    );
}

export default StoreInfo;