import React, { useState, useEffect } from 'react';
import Header from './Header';
import StoreList from './StoreList';
import StoreAdd from './StoreAdd';
import Tsidebar from './Tsidebar';
import Invoice from './Invoice';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  
    return (
        <div>
            <Tsidebar>
                <Container
                    fluid
                    className="d-flex h-100 flex-column w-100  justify-content-center "
                    style={{
                        boxSizing: 'border-box',
                        padding: '0px',
                        margin: '0px',
                        backgroundColor: 'rgb(249,250,252)',
                        flex: 1,
                    }}
                >
                    {/* 
                    //헤더를 포함한 화면
                    <Header />
                    <Container
                        fluid 
                          className="d-flex h-100 flex-column w-100  justify-content-center "
                        style={{
                            height: '100%',
                            padding: 0,
                            margin: 0,
                            backgroundColor: 'rgb(249,250,252)',
                        }}
                    >
                        <StoreList />
                        <StoreAdd />
                    </Container> */}
                    <Route path="/mch" component={Invoice} />
                </Container>
            </Tsidebar>
        </div>
    );
}

export default App;
