import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import StoreList from './StoreList/StoreList';
import StoreAdd from './StoreAdd/StoreAdd';
import Tsidebar from '../Store/Sidebar/Tsidebar';
import { Container, Button, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Sidebar from 'react-sidebar';

const mql = window.matchMedia(`(min-width: 800px)`);

function App() {
    return (
        <div>
                <Container
                    fluid
                    className="container-fluid d-flex h-100 flex-column w-100"
                    style={{
                        boxSizing: 'border-box',
                        padding: '0px',
                        margin: '0px',
                        backgroundColor: 'rgb(249,250,252)',
                        flex: 1,
                    }}
                >
                    <Header />
                    <Container
                        fluid
                        style={{
                            height: '100vh',
                            padding: 0,
                            margin: 0,
                            backgroundColor: 'rgb(249,250,252)',
                        }}
                    >
                        <Route path="/storelist" component={StoreList}/>
                        <Route path="/storeadd" component={StoreAdd}/>
                    </Container>
                </Container>
        </div>
    );
}

export default App;
