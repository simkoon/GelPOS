import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Container, Spinner } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { getList } from '../../lib/api/invoice';
import InvoiceItem from './InvoiceItem';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

let listener = null;

function Invoice({ history }) {
  const [loading, setLoading] = useState(false);

  const [receipt, setReceipt] = useState({
    _seq: '',
    _menu: '',
    _regDate: '',
    _paymentOption: '',
    _payment: '',
  });

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const storename = useRef('');
  useEffect(() => {
    if (user === null || !user || user === '' || user === 'null') {
      storename.current = '';
      history.push('/');
    }
  }, [history, user, storename]);

  useEffect(() => {
    return () => {
      storename.current = '';
    };
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  registerLocale('ko', ko);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }

  const [rowData, setRowData] = useState();

  useEffect(() => {
    (async () => {
      try {
        const result = await getList({ date: startDate });
        setRowData(result.data);
        setLoading(() => true);
      } catch (error) {
        history.push('/');
        alert('잘못된 접근입니다.');
      }
    })();
  }, [history, startDate]);

  const onButtonClick = async (e) => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    selectedData.forEach((node) => {
      const thisDate = new Date(node['regDate']);
      const getDate =
        thisDate.getFullYear() +
        '/' +
        thisDate.getMonth() +
        '/' +
        thisDate.getDate() +
        ' ' +
        thisDate.getHours() +
        ':' +
        thisDate.getMinutes() +
        ':' +
        thisDate.getSeconds();
      console.log(node['menu']);
      setReceipt(() => ({
        _seq: node['seq'],
        _menu: node['menu'],
        _regDate: getDate,
        _paymentOption: node['paymentOption'],
        _payment: node['payment'],
      }));
    });
  };

  useEffect(() => {
    console.log('useEffect');
    storename.current = '';
    listener = window.addEventListener('resize', () => {
      if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    });
    if (user) {
      user.store.forEach((i) => {
        if (i._id === user.nowstore) {
          storename.current = i.name;
          return;
        }
      });
    }

    return () => {
      storename.current = '';
      window.removeEventListener('resize', listener);
    };
  });
  return (
    <>
      {loading ? (
        storename.current ? (
          <Container
            fluid
            className="d-flex h-100 w-100 flex-column w-100  justify-content-center "
            style={{
              height: '100%',
              padding: 0,
              margin: 0,
              backgroundColor: 'rgb(249,250,252)',
            }}
          >
            <Row className="p-4 m-1 pt-0 h-100 " style={{ flex: 1 }}>
              <Col
                md={{ span: 4 }}
                className="justify-content-end flex-column d-flex"
              >
                <h5>
                  {storename.current ? storename.current : '잘못된 접근입니다.'}
                </h5>
                <h3>§ 거래 내역</h3>
              </Col>
            </Row>
            <Row className="p-1 m-0 h-100" style={{ flex: 3 }}>
              <Col lg={{ span: 8 }} className="text-center">
                <Row>
                  <Col className="justify-content-start d-flex">
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
                  <Col className="mb-2">
                    <div
                      className="ag-theme-alpine"
                      style={{ height: 400, width: '100%', textAlign: 'left' }}
                    >
                      <AgGridReact
                        overlayNoRowsTemplate="<p>불러올 거래내역이 없습니다.</p>"
                        rowSelection="single"
                        rowData={rowData}
                        onGridReady={onGridReady}
                        onSelectionChanged={onButtonClick}
                      >
                        <AgGridColumn
                          field="seq"
                          headerName={'거래 번호'}
                          sortable={true}
                          filter={true}
                          checkboxSelection={true}
                          resizable={true}
                        ></AgGridColumn>
                        <AgGridColumn
                          field="menu"
                          headerName={'메뉴'}
                          sortable={true}
                          filter={true}
                          resizable={true}
                          valueFormatter={function (params) {
                            console.log('여기벨류');
                            console.log(params.value);
                            const menu = params.value;

                            if (menu.length > 2) {
                              return (
                                menu[0].name +
                                ', ' +
                                menu[1].name +
                                '외 ' +
                                (params.value.length - 2) +
                                '가지'
                              );
                            } else {
                              let sumName = '';
                              for (const i of menu) {
                                if (i === menu[menu.length - 1]) {
                                  sumName += i.name;
                                } else {
                                  sumName += i.name + ', ';
                                }
                              }
                              return sumName;
                            }
                          }}
                        ></AgGridColumn>
                        <AgGridColumn
                          field="regDate"
                          headerName={'거래 시간'}
                          sortable={true}
                          filter={true}
                          resizable={true}
                          valueFormatter={function (params) {
                            return new Date(params.value).toLocaleTimeString();
                          }}
                        ></AgGridColumn>
                        <AgGridColumn
                          field="paymentOption"
                          headerName={'거래 방식'}
                          sortable={true}
                          filter={true}
                          resizable={true}
                        ></AgGridColumn>
                        <AgGridColumn
                          field="payment"
                          headerName={'금액'}
                          sortable={true}
                          filter={true}
                          resizable={true}
                        ></AgGridColumn>
                      </AgGridReact>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="p-0 m-0" style={{ height: '80%' }}>
                <Row className="h-100 w-100 m-0">
                  <Col className="h-100">
                    <Card style={{ width: '100%', height: '100%' }}>
                      <Card.Body
                        style={{
                          width: '100%',
                          height: '100%',
                          overflowY: 'scroll',
                          position: 'absolute',
                        }}
                      >
                        <Card.Title>영수증</Card.Title>
                        <Card.Text>
                          {receipt._seq === '' ? (
                            <p>거래를 선택해주세요.</p>
                          ) : (
                            <>
                              <p>거래번호: {receipt._seq}</p>
                              <p>거래시간: {receipt._regDate}</p>
                              <p>거래방식: {receipt._paymentOption}</p>
                              <InvoiceItem menu={receipt._menu} />
                            </>
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="w-100">
                  <Col className="justify-content-end d-flex mt-1 mb-4">
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
          </Container>
        ) : (
          <></>
        )
      ) : (
        <Container
          fluid
          className="d-flex h-100 w-100 flex-column w-100  justify-content-center "
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
export default withRouter(Invoice);
