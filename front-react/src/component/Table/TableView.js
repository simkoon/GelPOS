import { Route } from "react-router-dom";
import styled from "styled-components";
import { Button, Row, Col } from "react-bootstrap";
const TableCantainer = styled.div`
  padding: 70px;
`;
const Table = styled(Button)`
  display: inline-block;
  width: 250px;
  height: 250px;
  background-color: black;
  cursor: pointer;

  & + & {
    margin-left: 10px;
    margin-top: 10px;
  }

  &:first-child {
    margin-left: 10px;
    margin-top: 10px;
  }
`;

const SidebarContainer = () => {
  return (
    <>
      <TableCantainer>
        <Row>
          <Col md="12">
            <Table className=""></Table>
            <Table className=""></Table>
            <Table className=""></Table>
          </Col>
          <Col md="12">
            <Table className=""></Table>
            <Table className=""></Table>
            <Table className=""></Table>
          </Col>
          <Col md="12">
            <Table className=""></Table>
            <Table className=""></Table>
            <Table className=""></Table>
          </Col>
          <Col md="12">
            <Table className=""></Table>
            <Table className=""></Table>
            <Table className=""></Table>
          </Col>
        </Row>
      </TableCantainer>
    </>
  );
};

export default SidebarContainer;
