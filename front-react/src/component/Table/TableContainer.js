import { Container, Col, Row } from 'react-bootstrap';
import TableItem from './TableItem';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function TableContainer() {
  const [tables, setTables] = useState([]);

  console.log(document.cookie);
  const socket = io.connect('/');
  socket.emit('joinRoom', '123');
  socket.emit('getTables');
  socket.on('getTables', function (data) {
    console.log('데이터수신');
    console.log(data);
    setTables(() => data.table);
  });
  return (
    <Container
      fluid
      className="d-flex h-100 w-100 flex-column"
      style={{
        height: '100%',
        padding: 0,
        margin: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <Row className="pl-4 m-1 pt-5 pb-3 h-100 " style={{ flex: 0 }}>
        <Col>
          <h1>§ 현재 매장 정보</h1>
        </Col>
      </Row>
      <Row
        className="h-100 pl-5 pr-5 pb-0 pt-4 mb-4"
        style={{
          flex: 1,
          margin: '10px auto',
          backgroundColor: 'rgba(61, 74, 150, 0.1)',
          maxWidth: '1400px',
        }}
      >
        {tables.map}
        <TableItem />
      </Row>
    </Container>
  );
}
