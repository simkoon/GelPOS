import styled from "styled-components";
import { Button } from "react-bootstrap";

export const AddCon = styled.div`
  overflow-y: hidden;
  position: absolute;
  top: 100px;
  width: 80%;
  height: 100%;
  margin-left: 90%;
  //margin-top: 150px;
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
`;

export const CategoryBtn = styled(Button)`
  box-shadow: 5px 5px 10px 1px rgb(190, 190, 190) !important;
  border: none;
  width: 120px;
  height: 70px;
  background-color: rgb(140, 70, 77);
  & + & {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:first-child {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:hover {
    background-color: rgb(80, 10, 17);
  }
  &:focus {
    border: none;
    background-color: rgb(80, 10, 17) !important;
  }
`;

export const MenuBtn = styled(Button)`
  box-shadow: 5px 5px 10px 1px rgb(190, 190, 190) !important;
  border-radius: 10px 10px;
  border: none;
  width: 120px;
  height: 70px;
  background-color: rgb(140, 70, 77);
  & + & {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:first-child {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:hover {
    background-color: rgb(80, 10, 17);
  }
  &:focus {
    border: none;
    background-color: rgb(80, 10, 17) !important;
  }
`;

export const CategoryBtnBox = styled.div`
  position: relative;
  margin: 0px auto;
  text-align: center;
  width: 500px;
  height: 500px;
  background-color: white;
  border: 0.5px solid rgb(200, 200, 200);
  overflow: hidden;
  .btnContainer {
    padding: 25px 25px;
    height: 100%;
    overflow-y: scroll;
  }
`;

export const MenuBtnBox = styled.div`
  margin: 0px auto;
  width: 500px;
  text-align: left;
  height: 150px;
  background-color: white;
  border: 0.5px solid rgb(200, 200, 200);
  overflow-x: hidden;
  scroll-behavior: smooth;
  ::-webkit-scrollbar-thumb {
    background-color: black;
    width: 50px;
    height: 50px;
  }
  ::-webkit-scrollbar {
    display: block;
    width: 20px;
    height: 20px;
  }

  .btnContainer {
    padding: 25px 25px;
    width: 100%;
    height: 150px;
    ::-webkit-scrollbar {
      width: 50px;
      height: 50px;
    }
  }
`;
