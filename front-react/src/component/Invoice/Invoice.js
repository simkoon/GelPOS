import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Button, Container, Spinner } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { getList, refund } from "../../lib/api/invoice";
import InvoiceItem from "./InvoiceItem";
import addComma from "../../utility/addComma";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Invoice.scss";

function Invoice({ history }) {
  const [loading, setLoading] = useState(false);
  const listener2 = useRef(null);
  const [receipt, setReceipt] = useState({
    _seq: "",
    _menu: "",
    _regDate: "",
    _paymentOption: "",
    _payment: "",
  });

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const storename = useRef("");
  useEffect(() => {
    if (user === null || !user || user === "" || user === "null") {
      storename.current = "";
      history.push("/");
    }
  }, [history, user, storename]);

  useEffect(() => {
    return () => {
      storename.current = "";
    };
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  registerLocale("ko", ko);

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }

  const [rowData, setRowData] = useState();
  const [listSumState, setlistSumState] = useState({
    allSum: 0,
    refundSum: 0,
    netSum: 0,
  });

  useEffect(() => {
    (async () => {
      const listSum = {
        allSum: 0,
        refundSum: 0,
        netSum: 0,
      };

      try {
        const result = await getList({ date: startDate });

        setRowData(result.data);
        setLoading(() => true);

        result.data.forEach((item) => {
          if (item.paymentOption === "환불") {
            listSum.refundSum += Number(item.payment);
          } else {
            listSum.allSum += Number(item.payment);
          }
        });
        listSum.netSum = listSum.allSum - listSum.refundSum;
        setlistSumState(() => listSum);
      } catch (error) {
        history.push("/");
        alert("잘못된 접근입니다.");
      }
    })();
  }, [history, startDate]);

  const onButtonClick = async (e) => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    selectedData.forEach((node) => {
      const thisDate = new Date(node["regDate"]);
      const getDate =
        thisDate.getFullYear() +
        "/" +
        thisDate.getMonth() +
        "/" +
        thisDate.getDate() +
        " " +
        thisDate.getHours() +
        ":" +
        thisDate.getMinutes() +
        ":" +
        thisDate.getSeconds();
      setReceipt(() => ({
        _seq: node["seq"],
        _menu: node["menu"],
        _regDate: getDate,
        _paymentOption: node["paymentOption"],
        _payment: node["payment"],
      }));
    });
  };
  const invoicePrint = useRef(null);
  const print = () => {
    const html = document.querySelector("html");
    const printContents = invoicePrint.current;
    const printDiv = document.createElement("DIV");
    printDiv.className = "h-100";

    html.appendChild(printDiv);
    printDiv.appendChild(printContents.cloneNode(true));
    document.body.style.display = "none";
    window.print();
    document.body.style.display = "block";
    printDiv.style.display = "none";
  };

  const onClickRefund = async () => {
    const refundResult = await refund(receipt);
    alert("환불이 완료되었습니다.");
    (async () => {
      const listSum = {
        allSum: 0,
        refundSum: 0,
        netSum: 0,
      };
      try {
        const result = await getList({ date: startDate });
        setRowData(result.data);
        setLoading(() => true);
        result.data.forEach((item) => {
          if (item.paymentOption === "환불") {
            listSum.refundSum += Number(item.payment);
          } else {
            listSum.allSum += Number(item.payment);
          }
        });
        listSum.netSum = listSum.allSum - listSum.refundSum;
        setlistSumState(() => listSum);
      } catch (error) {
        history.push("/");
        alert("잘못된 접근입니다.");
      }
    })();
    setReceipt(() => ({
      _seq: "",
      _menu: "",
      _regDate: "",
      _paymentOption: "",
      _payment: "",
    }));
  };

  useEffect(() => {
    storename.current = "";
    listener2.current = () => {
      if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    };
    window.addEventListener("resize", listener2.current);
    if (user) {
      user.store.forEach((i) => {
        if (i._id === user.nowstore) {
          storename.current = i.name;
          return;
        }
      });
    }
    return () => {
      storename.current = "";
      window.removeEventListener("resize", listener2.current);
    };
  });

  const dataComparator = function (data1, data2) {
    return data1[0].name < data2[0].name
      ? -1
      : data1[0].name > data2[0].name
      ? 1
      : 0;
  };

  const containsFilterParams = {
    valueGetter: (params) => {
      let sumMenu = "";
      params.data.menu.forEach((item) => {
        sumMenu += " " + item.name;
      });
      return sumMenu;
    },
    filterOptions: [
      {
        displayKey: "containsMenu",
        displayName: "메뉴를 포함하는",
        test: (filterValue, cellValue) => {
          return cellValue != null && cellValue.indexOf(filterValue) > -1;
        },
        hideFilterInput: false,
      },
    ],
  };

  const dateFilterParams = {
    valueGetter: (params) => {
      return new Date(params.data.regDate).toLocaleTimeString();
    },
  };
  const isFiltered = useRef(false);
  const onRefreshCells = (params) => {
    isFiltered.current = true;

    setlistSumState(() => ({
      allSum: 0,
      refundSum: 0,
      netSum: 0,
    }));

    gridApi.refreshCells();

    isFiltered.current = false;
  };

  return (
    <>
      {loading ? (
        storename.current ? (
          <Container
            fluid
            className="d-flex h-100 w-100 flex-column w-100  justify-content-center "
            style={{
              height: "100%",
              padding: 0,
              margin: 0,
              backgroundColor: "rgb(249,250,252)",
            }}
          >
            <Row className="p-4 m-1 pt-0 h-100 " style={{ flex: 1 }}>
              <Col
                md={{ span: 4 }}
                className="justify-content-end flex-column d-flex"
              >
                <h5>
                  {storename.current ? storename.current : "잘못된 접근입니다."}
                </h5>
                <h3>§ 거래 내역</h3>
              </Col>
            </Row>
            <Row className="p-1 m-0 h-100" style={{ flex: 3 }}>
              <Col
                lg={{ span: 8 }}
                className="text-center"
                style={{
                  height: "80%",
                }}
              >
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
                      style={{
                        height: 400,
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      <AgGridReact
                        onFilterChanged={onRefreshCells}
                        overlayNoRowsTemplate="<p>불러올 거래내역이 없습니다.</p>"
                        rowSelection="single"
                        rowData={rowData}
                        onGridReady={onGridReady}
                        onSelectionChanged={onButtonClick}
                        animateRows={true}
                        getRowClass={(params) => {
                          if (params.data.paymentOption === "환불") {
                            return "refund";
                          }
                          if (
                            params.data.paymentOption.indexOf("환불완료") !== -1
                          ) {
                            return "refundSuccess";
                          }
                        }}
                      >
                        <AgGridColumn
                          field="seq"
                          headerName={"거래 번호"}
                          filter="agNumberColumnFilter"
                          sortable={true}
                          checkboxSelection={true}
                          resizable={true}
                        ></AgGridColumn>
                        <AgGridColumn
                          field="menu"
                          headerName={"메뉴"}
                          sortable={true}
                          filter={true}
                          resizable={true}
                          comparator={dataComparator}
                          valueFormatter={function (params) {
                            const menu = params.value;

                            if (menu.length > 2) {
                              return (
                                menu[0].name +
                                ", " +
                                menu[1].name +
                                "외 " +
                                (params.value.length - 2) +
                                "가지"
                              );
                            } else {
                              let sumName = "";
                              for (const i of menu) {
                                if (i === menu[menu.length - 1]) {
                                  sumName += i.name;
                                } else {
                                  sumName += i.name + ", ";
                                }
                              }
                              return sumName;
                            }
                          }}
                          filterParams={containsFilterParams}
                        ></AgGridColumn>
                        <AgGridColumn
                          field="regDate"
                          headerName={"거래 시간"}
                          sortable={true}
                          filter={true}
                          resizable={true}
                          filterParams={dateFilterParams}
                          valueFormatter={function (params) {
                            return new Date(params.value).toLocaleTimeString();
                          }}
                        ></AgGridColumn>
                        <AgGridColumn
                          field="paymentOption"
                          headerName={"거래 방식"}
                          sortable={true}
                          filter={true}
                          resizable={true}
                        ></AgGridColumn>
                        <AgGridColumn
                          field="payment"
                          headerName={"금액"}
                          sortable={true}
                          filter={true}
                          resizable={true}
                          valueGetter={(params) => {
                            if (isFiltered.current) {
                              const payment = params.data.payment;
                              if (params.data.paymentOption === "환불") {
                                setlistSumState((prev) => ({
                                  ...prev,
                                  refundSum: (prev.refundSum += Number(
                                    payment
                                  )),
                                }));
                              } else {
                                setlistSumState((prev) => ({
                                  ...prev,
                                  allSum: (prev.allSum += Number(payment)),
                                }));
                              }
                              setlistSumState((prev) => ({
                                ...prev,
                                netSum: prev.allSum - prev.refundSum,
                              }));
                            }
                            return params.data.payment;
                          }}
                          valueFormatter={function (params) {
                            return addComma(params.value);
                          }}
                        ></AgGridColumn>
                      </AgGridReact>
                      <p
                        className="mb-3"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          fontSize: "16px",
                        }}
                      >
                        <h4 className="mr-1">판매금액 : </h4>
                        <h5 className="mr-4 mt-1 ml-1">
                          {addComma(listSumState.allSum)} 원
                        </h5>
                        <h4 className="mr-1" style={{ color: "#8c464d" }}>
                          환불액 :{" "}
                        </h4>{" "}
                        <h5
                          className="mr-4 mt-1 ml-1"
                          style={{ color: "#8c464d" }}
                        >
                          {addComma(listSumState.refundSum)} 원
                        </h5>
                        <h4 className="mr-1" style={{ color: "#000046" }}>
                          실판매금액:{" "}
                        </h4>{" "}
                        <h5
                          className="mr-1 mt-1 ml-1"
                          style={{ color: "#000046" }}
                        >
                          {addComma(listSumState.netSum)} 원
                        </h5>
                      </p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="p-0 m-0" style={{ height: "80%" }}>
                <Row className="h-100 w-100 m-0">
                  <Col className="h-100">
                    <Card
                      ref={invoicePrint}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Card.Body
                        style={{
                          width: "100%",
                          height: "100%",
                          overflowY: "auto",
                          position: "absolute",
                        }}
                      >
                        <Card.Title>영수증</Card.Title>
                        <div className="card-text">
                          {receipt._seq === "" ? (
                            <p>거래를 선택해주세요.</p>
                          ) : (
                            <>
                              <p>거래번호: {receipt._seq}</p>
                              <p>거래시간: {receipt._regDate}</p>
                              <p>거래방식: {receipt._paymentOption}</p>
                              <InvoiceItem menu={receipt._menu} />
                            </>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="w-100">
                  <Col className="justify-content-end d-flex mt-1 mb-4">
                    {receipt._paymentOption === "" ||
                    receipt._paymentOption === "환불" ||
                    receipt._paymentOption === "현금(환불완료)" ||
                    receipt._paymentOption === "카카오페이(환불완료)" ? (
                      <Button
                        onClick={onClickRefund}
                        size="lg"
                        className="btn_color_purple mr-1"
                        disabled
                      >
                        주문 취소
                      </Button>
                    ) : (
                      <Button
                        onClick={onClickRefund}
                        size="lg"
                        className="btn_color_purple mr-1"
                      >
                        주문 취소
                      </Button>
                    )}{" "}
                    {receipt._paymentOption === "" ? (
                      <Button
                        size="lg"
                        className="btn_color_purple"
                        onClick={print}
                        disabled
                      >
                        영수증 출력
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className="btn_color_purple"
                        onClick={print}
                      >
                        영수증 출력
                      </Button>
                    )}
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
          className="d-flex h-100 flex-column w-100  justify-content-center "
          style={{
            overflow: "hidden",
            height: "100%",
            padding: 0,
            margin: 0,
            backgroundColor: "rgb(249,250,252)",
          }}
        >
          <Row className="text-center">
            <Col lg={{ span: 12 }}>
              <Spinner
                animation="border"
                role="status"
                style={{
                  verticalAlign: "center",
                }}
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
              <h1 className={"d-inline-block text-center m-0 ml-2"}>
                {" "}
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
