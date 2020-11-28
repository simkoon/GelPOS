import { Container, Row, Col, Spinner, Table, Button } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import TableOrderList from './TableOrderList';
import TableMenuList from './TableMenuList';
import addComma from '../../utility/addComma';
import SocketContext from '../context/socket/context';
import {
  onModifyTable,
  getOneTable,
  onPaymentTable,
  onLoading,
} from '../../sockets/emit';
export default function TableDetail({ match, history }) {
  const { seq } = match.params;
  const { oneTable, loading } = useContext(SocketContext);
  let getSum = 0;

  useEffect(() => {
    if (seq) {
      getOneTable(seq);
    }
    return () => {
      onLoading();
    };
  }, []);

  const modifyTable = (act, item) => {
    onModifyTable(oneTable.table, item, seq, act);
  };

  const paymentTable = (act) => {
    onPaymentTable(oneTable.table, seq, act, getSum);
    alert('결제가 완료되었습니다.');
    history.push('../');
  };
  return (
    <>
      {oneTable && loading ? (
        <Container
          fluid
          className="d-flex h-100 w-100 flex-column p-0"
          style={{
            height: '100%',
            padding: 0,
            margin: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            minHeight: '800px',
          }}
        >
          <Row className="h-100 w-100 m-0 p-5">
            <Col
              md={7}
              className="h-100 w-100 p-0 d-flex"
              style={{
                border: '1px solid #dee2e6',
                borderRadius: '8px 8px',
                flexDirection: 'column',
              }}
            >
              {oneTable.category[0] ? (
                <TableMenuList
                  modifyTable={modifyTable}
                  category={oneTable.category}
                />
              ) : (
                <h1>메뉴를 추가해주세요.</h1>
              )}
            </Col>
            <Col
              md={5}
              className="h-100 w-100 p-0 d-flex"
              style={{
                border: '1px solid #dee2e6',
                borderRadius: '8px 8px',
                flexDirection: 'column',
              }}
            >
              <div
                className="table-responsive pl-1 pr-1"
                style={{
                  overflowY: 'auto',
                  height: '80%',
                  borderBottom: '1px solid #dee2e6',
                  flex: 5,
                }}
              >
                <Table className="w-100" hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>메뉴명</th>
                      <th>수량</th>
                      <th>가격</th>
                      <th>금액</th>
                    </tr>
                  </thead>
                  {oneTable.table ? (
                    <tbody>
                      {oneTable.table.nowMenu.map((menu, index) => {
                        getSum += Number(menu.priceSum);
                        return (
                          <TableOrderList
                            key={menu._id}
                            menu={menu}
                            menuSeq={index + 1}
                            modifyTable={modifyTable}
                          />
                        );
                      })}
                    </tbody>
                  ) : null}
                </Table>
              </div>
              <div
                className="d-flex h-100"
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                <div
                  className="p-2"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>총 금액 :</span>
                  <span className="ml-1">{addComma(getSum)} 원</span>
                </div>
                <div
                  className="p-2"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {getSum === 0 ? (
                    <>
                      <Button
                        variant="success"
                        className="mr-1"
                        onClick={() => {
                          paymentTable('cashPay');
                        }}
                        size="lg"
                        disabled
                      >
                        현금 결제
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => {
                          paymentTable('kakao');
                        }}
                        size="lg"
                        disabled
                      >
                        카카오페이 결제
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="success"
                        className="mr-1"
                        size="lg"
                        onClick={() => {
                          paymentTable('cashPay');
                        }}
                      >
                        현금 결제
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => {
                          paymentTable('kakao');
                        }}
                        size="lg"
                      >
                        카카오페이 결제
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container
          fluid
          className="d-flex h-100 w-100 flex-column w-100 justify-content-center "
          style={{
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
}
