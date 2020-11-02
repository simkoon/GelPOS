import React, { useState } from 'react';
import { Row, Col, Table, Card, Button } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

function Invoice() {
    const [startDate, setStartDate] = useState(new Date());
    registerLocale('ko', ko);
    return (
        <>
            <Row className="p-4 m-1 pt-0 h-100 " style={{ flex: 1 }}>
                <Col
                    md={{ span: 4 }}
                    className="justify-content-end flex-column d-flex"
                >
                    <h3>§ 거래 내역</h3>
                </Col>
            </Row>
            <Row className="p-1 m-0 h-100" style={{ flex: 3 }}>
                <Col md={{ span: 8 }} className="text-center">
                    <Row>
                        <Col className="justify-content-end d-flex">
                            <DatePicker
                                className="text-right mb-1 pr-1"
                                dateFormat="yyyy.MM.dd(eee)"
                                locale="ko"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>거래 번호</th>
                                        <th>메뉴</th>
                                        <th>판매 시간</th>
                                        <th>판매 방법</th>
                                        <th>금액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>짬뽕 외 3</td>
                                        <td>2020.10.10</td>
                                        <td>카카오페이</td>
                                        <td>10000</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Larry the Bird</td>
                                        <td>@twitter</td>
                                        <td>@mdo</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Larry the Bird</td>
                                        <td>@twitter</td>
                                        <td>@mdo</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Larry the Bird</td>
                                        <td>@twitter</td>
                                        <td>@mdo</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Larry the Bird</td>
                                        <td>@twitter</td>
                                        <td>@mdo</td>
                                        <td>@mdo</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
                <Col className="p-0 m-0" style={{ height: '60%' }}>
                    <Row className="h-100 w-100 m-0">
                        <Col className="h-100">
                            <Card style={{ width: '100%', height: '100%' }}>
                                <Card.Body>
                                    <Card.Title>영수증 부분</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the
                                        card title and make up the bulk of the
                                        card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="w-100">
                        <Col className="justify-content-end d-flex mt-1">
                            <Button size="sm" className="mr-1 btn_color_purple">
                                영수증 출력
                            </Button>{' '}
                            <Button size="sm" className="btn_color_purple">
                                주문 취소
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}
export default Invoice;