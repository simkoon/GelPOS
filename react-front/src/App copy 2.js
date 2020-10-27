import React from 'react';
import Header from './Header';
import StoreList from './StoreList';
import StoreAdd from './StoreAdd';
import { Container } from 'react-bootstrap';


import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
    return (
        <div
            className="container-fluid d-flex h-100 flex-column w-100"
            style={{
                boxSizing: 'border-box',
                height: '100%',
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
                    height: '100%',
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'rgb(249,250,252)',
                }}
            >
                <StoreList />
                <StoreAdd />
            </Container>
        </div>
    );
}

export default App;
