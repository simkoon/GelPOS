import React,{useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import Information from './Information';


function StoreInfo(){
    return (
        <>
            <Container 
                fluid
                className="" 
                style={{
                    height: '100%',
                    padding: 0,
                    margin: 0
                }}>
                <Information/>
            </Container>
        </>
    )
}


export default StoreInfo;