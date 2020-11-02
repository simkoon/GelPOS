import React from 'react';

import { Button, Row, Col } from 'react-bootstrap';

function StoreList() {
    return (
        <div
            style={{ height: '100%', maxWidth: '1024px' }}
            className="row justify-content-center align-items-center mx-auto"
        >
            <Row className="w-100">
                <Col className="w-100">
                    <h4
                        className="text-center mb-5"
                        style={{ color: 'rgb(62,78,93)' }}
                    >
                        심호길님의 가게 목록
                    </h4>
                    <Row className="w-100 justify-content-center align-items-center m-0">
                    <Col md={2} className="text-center mb-2">
                            <Button
                                className="btn_color_purple"
                                style={{
                                    height: '15vh',
                                    width: '100%',
                                    fontSize: '0.8em',
                                }}
                            >
                                <p className="mb-1">써브웨이 별내점</p>

                                <p
                                    style={{
                                        color: 'rgb(220,220,220)',
                                        display: 'block',
                                        padding: 0,
                                        margin: 0,
                                        fontSize: '0.5em',
                                        lineHeight: '100%',
                                    }}
                                >
                                    2020.05.26
                                </p>

                                <p
                                    style={{
                                        color: 'rgb(180,180,180)',
                                        display: 'block',
                                        padding: 0,
                                        margin: 0,
                                        fontSize: '0.5em',
                                        lineHeight: '100%',
                                    }}
                                >
                                    (2020.05.26)
                                </p>
                            </Button>
                        </Col>   <Col md={2} className="text-center mb-2">
                            <Button
                                className="btn_color_purple"
                                style={{
                                    height: '15vh',
                                    width: '100%',
                                    fontSize: '0.8em',
                                }}
                            >
                                <p className="mb-1">써브웨이 별내점</p>

                                <p
                                    style={{
                                        color: 'rgb(220,220,220)',
                                        display: 'block',
                                        padding: 0,
                                        margin: 0,
                                        fontSize: '0.5em',
                                        lineHeight: '100%',
                                    }}
                                >
                                    2020.05.26
                                </p>

                                <p
                                    style={{
                                        color: 'rgb(180,180,180)',
                                        display: 'block',
                                        padding: 0,
                                        margin: 0,
                                        fontSize: '0.5em',
                                        lineHeight: '100%',
                                    }}
                                >
                                    (2020.05.26)
                                </p>
                            </Button>
                        </Col>   <Col md={2} className="text-center mb-2">
                            <Button
                                className="btn_color_purple"
                                style={{
                                    height: '15vh',
                                    width: '100%',
                                    fontSize: '0.8em',
                                }}
                            >
                                <p className="mb-1">써브웨이 별내점</p>

                                <p
                                    style={{
                                        color: 'rgb(220,220,220)',
                                        display: 'block',
                                        padding: 0,
                                        margin: 0,
                                        fontSize: '0.5em',
                                        lineHeight: '100%',
                                    }}
                                >
                                    2020.05.26
                                </p>

                                <p
                                    style={{
                                        color: 'rgb(180,180,180)',
                                        display: 'block',
                                        padding: 0,
                                        margin: 0,
                                        fontSize: '0.5em',
                                        lineHeight: '100%',
                                    }}
                                >
                                    (2020.05.26)
                                </p>
                            </Button>
                        </Col>
                        <Col md={2} className="text-center mb-2 ">
                            <Button
                                className=""
                                style={{
                                    boxShadow:
                                        '5px 5px 10px 1px rgb(190,190,190)',
                                    borderRadius: '10px 10px',
                                    border: 'none',
                                    backgroundColor: 'rgb(222,222,231)',
                                    height: '15vh',
                                    width: '100%',
                                }}
                            >
                                +
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
export default StoreList;
