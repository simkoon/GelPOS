import React from 'react';

import { Button, Row, Col, Form } from 'react-bootstrap';

function StoreAdd() {
    return (
        <Row
            className="w-100 h-100 justify-content-center align-items-center mx-auto px-3"
            style={{
                maxWidth: '512px',
            }}
        >
            <Form
                className="w-100 p-5"
                style={{
                    backgroundColor: 'white',
                    borderRadius: '20px 20px',
                }}
            >
                <h2
                    className="text-center mb-5"
                    style={{
                        color: 'rgb(67,86,103)',
                    }}
                >
                    +가게추가
                </h2>
                <Form.Group controlId="formBasicStoreName">
                    <Form.Label
                        style={{
                            color: 'rgb(67,86,103)',
                        }}
                    >
                        ● 가게 상호
                    </Form.Label>
                    <Form.Control
                        className="mb-4"
                        type="text"
                        placeholder="내용을 입력해주세요."
                        style={{
                            borderColor: 'rgb(67,86,103)',
                            borderRadius: '20px 20px',
                            color: 'rgb(67,86,103)',
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicStoreName">
                    <Form.Label
                        style={{
                            color: 'rgb(67,86,103)',
                        }}
                    >
                        ● 사업자 등록 번호
                    </Form.Label>
                    <Form.Control
                        className="mb-4"
                        type="text"
                        placeholder="내용을 입력해주세요."
                        style={{
                            borderColor: 'rgb(67,86,103)',
                            borderRadius: '20px 20px',
                            color: 'rgb(67,86,103)',
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicStoreName">
                    <Form.Label
                        style={{
                            color: 'rgb(67,86,103)',
                        }}
                    >
                        ● 가게 주소
                    </Form.Label>
                    <Form.Control
                        className="mb-4"
                        type="text"
                        placeholder="내용을 입력해주세요."
                        style={{
                            borderColor: 'rgb(67,86,103)',
                            borderRadius: '20px 20px',
                            color: 'rgb(67,86,103)',
                        }}
                    />
                    <p className="text-center">
                        관리자 승인 후 사용 가능합니다.
                    </p>
                </Form.Group>
                <Form.Row className=" mx-auto">
                    <Button className="btn_color_purple" variant="primary">
                        Submit
                    </Button>
                    <Button
                        className="ml-auto btn_color_purple"
                        variant="primary"
                    >
                        Submit
                    </Button>
                </Form.Row>
            </Form>
        </Row>
    );
}
export default StoreAdd;
