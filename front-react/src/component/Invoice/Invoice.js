import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { getList } from '../../lib/api/invoice';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

let listener = null;

function Invoice({ history }) {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  let storename;

  useEffect(() => {
    if (user === null || !user || user === '' || user === 'null') {
      console.log('히스토리부분');
      console.log(user);
      history.push('/');
    }
  }, [history, user]);

  (() => {
    if (user) {
      user.store.forEach((i) => {
        if (i._id === user.nowstore) {
          storename = i.name;
          return;
        }
      });
    } else {
      history.push('/');
      return;
    }
  })();

  const [startDate, setStartDate] = useState(new Date());
  registerLocale('ko', ko);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }

  useEffect(() => {
    console.log('useEffect');

    listener = window.addEventListener('resize', () => {
      if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    });

    return () => {
      console.log('called');
      window.removeEventListener('resize', listener);
    };
  });

  const [rowData, setRowData] = useState();

  useEffect(() => {
    (async () => {
      const result = await getList({ date: startDate });
      setRowData(result.data);
    })();
  }, [startDate]);

  const onButtonClick = async (e) => {
    const selectedNodes = gridApi.getSelectedNodes();
    console.dir(selectedNodes);
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => '거래번호' + node['seq'])
      .join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  };

  return (
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
          <h5>{storename}</h5>
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
              <div
                className="ag-theme-alpine"
                style={{ height: 400, width: '100%', textAlign: 'left' }}
              >
                <Button onClick={onButtonClick}>버튼클릭</Button>
                <AgGridReact
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
                    sortable={true}
                    filter={true}
                    resizable={true}
                  ></AgGridColumn>
                  <AgGridColumn
                    field="regDate"
                    sortable={true}
                    filter={true}
                    resizable={true}
                  ></AgGridColumn>
                  <AgGridColumn
                    field="paymentOption"
                    sortable={true}
                    filter={true}
                    resizable={true}
                  ></AgGridColumn>
                  <AgGridColumn
                    field="payment"
                    sortable={true}
                    filter={true}
                    resizable={true}
                  ></AgGridColumn>
                </AgGridReact>
              </div>
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
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
    </Container>
  );
}
export default withRouter(Invoice);
