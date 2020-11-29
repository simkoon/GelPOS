import styled, { css, keyframes } from "styled-components";
import { Button } from "react-bootstrap";

export const AddCon = styled.div`
  position: absolute;
  width: 80%;
  top: 0px;
  padding-top: 50px;
  margin-left: 90%;
  //margin-top: 150px;
  text-align: center;
  h2 {
    text-align: center;
    font-weight: bold;
  }

  .menuAddBtn {
    margin-right: 30px;
    background-color: skyblue;
    width: 30%;
    margin-top: 1.5rem;
    padding: 10px;
    color: white;
    border: none;
    &:hover {
      background-color: deepskyblue;
    }
  }

  .menuUpdateBtn {
    margin-right: 30px;
    background-color: rgb(152, 201, 132);
    width: 30%;
    margin-top: 1.5rem;
    padding: 10px;
    color: white;
    border: none;
    &:hover {
      background-color: rgb(102, 151, 82);
    }
  }

  .menuDelBtn {
    margin-right: 30px;
    background-color: rgb(200, 100, 100);
    width: 30%;
    margin-top: 1.5rem;
    padding: 10px;
    color: white;
    border: none;
    &:hover {
      background-color: rgb(136, 0, 0);
    }
  }

  .underSelectP {
    color: gray;
    font-weight: lighter;
  }

  .offBtn {
    position: absolute;
    left: -50px;
    background-color: rgb(92, 110, 136);
    border: none;

    &:hover {
      background-color: rgb(52, 70, 96);
    }
    &:focus {
      background-color: rgb(52, 70, 96) !important;
    }
  }
`;

export const TableBtnBox = styled.div`
  //background-color: black;
  width: 100vh;
  height: 80vh;
`;

export const TableBtnContainer = styled.div`
  //background-color: white;
  width: 120%;
  height: 100%;
`;

export const TableBtn = styled(Button)`
  color: black !important;
  box-shadow: 5px 5px 10px 1px rgb(190, 190, 190) !important;
  border: none;
  width: 200px;
  height: 200px;
  background-color: rgb(242, 242, 251);
  border-radius: 10px 10px;
  & + & {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:nth-child(1) {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:hover {
    background-color: rgb(222, 222, 231);
  }
  &:focus {
    border: none;
    background-color: rgb(222, 222, 231) !important;
  }
`;

export const NewTableBtn = styled(Button)`
  box-shadow: 5px 5px 10px 1px rgb(190, 190, 190) !important;
  border-radius: 10px 10px;
  border: none;
  width: 200px;
  height: 200px;
  background-color: rgb(170, 221, 255);
  margin-top: 20px;
  margin-left: 20px;

  & + & {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:hover {
    background-color: rgb(140, 191, 255);
  }
  &:focus {
    border: none;
    background-color: rgb(140, 191, 255) !important;
  }
`;

export const TextInput = styled.input`
  display: block;
  margin-top: 20px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid black;

  &:focus {
    border: none;
    border-bottom: 1px solid black;
  }
`;
