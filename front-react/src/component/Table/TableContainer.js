import { Container, Col, Row, Spinner } from 'react-bootstrap';
import TableItem from './TableItem';
import io from 'socket.io-client';
import { useEffect, useState, memo } from 'react';
const socket = io();
export default memo(function TableContainer({ history }) {
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState([]);

  socket.on('getTables', function (data) {
    setTables(() => data.table);
    setLoading(() => true);
  });
  useEffect(() => {
    try {
      socket.connect('/');
      console.log('웹소켓 연결');
    } catch (error) {
      alert('잘못된 접근입니다.');
      history.push('/');
    }

    return () => {
      console.log('웹소켓 꺼짐');
      socket.close();
      socket.disconnect();
      // console.log(socket.disconnected);
    };
  });

  useEffect(() => {
    socket.emit('getTables');
  }, []);

  return (
    <>
      {loading ? (
        <Container
          fluid
          className="d-flex h-100 w-100 p-2 flex-column"
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
            className="h-100 pl-5 pr-5 pb-0 pt-0 mb-4 text-center"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: '10px auto',
              backgroundColor: 'rgba(61, 74, 150, 0.1)',
              width: '100%',
              maxWidth: '1400px',
              borderRadius: '8px 8px',
            }}
          >
            {tables.map((table, index) => {
              return <TableItem key={table._id} table={table} index={index} />;
            })}
          </Row>
        </Container>
      ) : (
        <Container
          fluid
          className="d-flex h-100 flex-column w-100  justify-content-center "
          style={{
            overflow: 'hidden',
            height: '100%',
            padding: 0,
            margin: 0,
            backgroundColor: 'rgb(249,250,252)',
          }}
        >
          <Row className="text-center">
            <Col lg={{ span: 12 }}>
              <Spinner
                animation="border"
                role="status"
                style={{
                  verticalAlign: 'center',
                }}
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
              <h1 className={'d-inline-block text-center m-0 ml-2'}>
                {' '}
                로딩중입니다...
              </h1>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
});
