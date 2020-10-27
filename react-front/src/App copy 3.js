import React, { useState, useEffect } from 'react';
import Header from './Header';
import StoreList from './StoreList';
import StoreAdd from './StoreAdd';
import { Container, Button, Row, Col } from 'react-bootstrap';
import Tsidebar from './Tsidebar'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Sidebar from 'react-sidebar';

const mql = window.matchMedia(`(min-width: 800px)`);

function App() {
    const [sidebarDocked, setSidebarDocked] = useState(mql.matches);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onSetSidebarOpen = (open) => {
        setSidebarOpen((prev) => open);
    };
    const mediaQueryChanged = () => {
        console.log(mql.matches);
        setSidebarDocked((prev) => mql.matches);
        setSidebarOpen((prev) => !prev);
    };

    useEffect(() => {
        mql.addListener(mediaQueryChanged);

        // returned function will be called on component unmount
        return () => {
            mql.removeListener(mediaQueryChanged);
        };
    }, []);
    return (
        <div>
            <Sidebar
                sidebar={
                    <>
                        <p>
                            <Button>두창이 똥꼬</Button>
                        </p>
                        <Button>야옹이 똥꼬</Button>
                    </>
                }
                open={sidebarOpen}
                docked={sidebarDocked}
                onSetOpen={onSetSidebarOpen}
                styles={{ sidebar: { background: 'white' } }}
            >
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
                    <Row>
                        <Col>
                            {!sidebarDocked ? (
                                <Button
                                    className="btn_color_purple"
                                    onClick={() => onSetSidebarOpen(true)}
                                >
                                    Open sidebar
                                </Button>
                            ) : null}
                        </Col>
                    </Row>
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
                </Container>
            </Sidebar>
        </div>
    );
}

export default App;
