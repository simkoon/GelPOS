import { Route } from "react-router-dom";
import styled from "styled-components";
const TableCantainer = styled.div``;
const Table = styled.div`
  width: 200px;
  height: 200px;
  background-color: black;

  & + & {
    margin: 10px;
  }
`;

const SidebarContainer = () => {
  return (
    <>
      <TableCantainer>
        <Table className=""></Table>
        <Table className=""></Table>
        <Table className=""></Table>
        <Table className=""></Table>
        <Table className=""></Table>
      </TableCantainer>
    </>
  );
};

export default SidebarContainer;
