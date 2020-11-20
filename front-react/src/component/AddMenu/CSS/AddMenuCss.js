import styled from "styled-components";
import { Button } from "react-bootstrap";

export const AddCon = styled.div`
  position: absolute;
  width: 1000px;
  height: 100%;
  margin-left: 90%;
  margin-top: 150px;
  text-align: left;
  h2 {
    text-align: center;
    font-weight: bold;
  }

  .AddConInput {
    border: none;
    border-bottom: 1px solid gray;
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    margin-top: 3rem;
  }

  .menuAddBtn {
    background-color: skyblue;
    width: 100%;
    margin-top: 1.5rem;
    padding: 10px;
    color: white;
    border: none;
    &:hover {
      background-color: deepskyblue;
    }
  }

  .underSelectP {
    color: gray;
    font-weight: lighter;
  }
`;

export const CategoryBtn = styled(Button)`
  width: 100px;
  height: 50px;
  background-color: rgb(92, 110, 136);
  & + & {
    margin-top: 10px;
    margin-left: 10px;
  }

  &:first-child {
    margin-top: 10px;
    margin-left: 10px;
  }
`;

export const CategoryBtnBox = styled.div`
  position: relative;
  margin: 0px auto;
  text-align: left;
  width: 500px;
  height: 150px;
  background-color: rgb(230, 230, 230);
  margin-bottom: 20px;
  border: 1px solid black;
  overflow: hidden;
  .btnContainer {
    padding: 25px 25px;
    height: 100%;
    overflow: scroll;
  }
`;
