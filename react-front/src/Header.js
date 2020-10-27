import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (
        <>
            <Navbar
                className="w-100"
                expand="lg"
                style={{
                    flex: 1,
                    backgroundColor: 'rgb(251,252,254)',
                    boxSizing: 'border-box',
                }}
            >
                <Navbar.Brand
                    href="/home"
                    className="font-weight-bolder"
                    style={{
                        color: 'rgb(62,78,93)',
                    }}
                >
                    GELPOS
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav " />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link
                            style={{
                                color: 'rgb(62,78,93)',
                            }}
                            href="/home"
                            className="small font-weight-normal"
                        >
                            홈으로
                        </Nav.Link>
                        <Nav.Link
                            href="/"
                            className="small font-weight-normal"
                            style={{
                                color: 'rgb(62,78,93)',
                            }}
                        >
                            고객센터
                        </Nav.Link>
                        <Nav.Link
                            style={{
                                color: 'rgb(62,78,93)',
                            }}
                            href="/link"
                            className="small font-weight-normal"
                        >
                            로그아웃
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
export default Header;
