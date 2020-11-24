import styled, { css, keyframes } from "styled-components";
import { Button, Row } from "react-bootstrap";

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

export const NewCategoryBtn = styled(Button)`
  box-shadow: 5px 5px 10px 1px rgb(190, 190, 190) !important;
  border-radius: 10px 10px;
  border: none;
  width: 120px;
  height: 70px;
  background-color: rgb(222, 222, 231);
  margin-top: 20px;
  margin-left: 20px;

  & + & {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:hover {
    background-color: rgb(192, 192, 201);
  }
  &:focus {
    border: none;
    background-color: rgb(192, 192, 201) !important;
  }
`;

export const CategoryBtn = styled(Button)`
  box-shadow: 5px 5px 10px 1px rgb(190, 190, 190) !important;
  border: none;
  width: 120px;
  height: 70px;
  background-color: rgb(140, 70, 77);
  border-radius: 10px 10px;
  & + & {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:nth-child(2) {
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

export const NewMenuBtn = styled(Button)`
  box-shadow: 5px 5px 10px 1px rgb(190, 190, 190) !important;
  border-radius: 10px 10px;
  border: none;
  width: 120px;
  height: 70px;
  background-color: rgb(222, 222, 231);
  margin-top: 20px;
  margin-left: 20px;

  & + & {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:hover {
    background-color: rgb(192, 192, 201);
  }
  &:focus {
    border: none;
    background-color: rgb(192, 192, 201) !important;
  }
`;

export const MenuBtn = styled(Button)`
  box-shadow: 5px 5px 10px 1px rgb(190, 190, 190) !important;
  border-radius: 10px 10px;
  border: none;
  width: 120px;
  height: 70px;
  background-color: rgb(140, 191, 255);

  & + & {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:nth-child(2) {
    margin-top: 20px;
    margin-left: 20px;
  }

  &:hover {
    background-color: rgb(110, 161, 235);
  }
  &:focus {
    border: none;
    background-color: rgb(110, 161, 235) !important;
  }
`;

export const CategoryBtnBox = styled.div`
  position: relative;
  margin: 0px auto;
  text-align: left;
  width: 500px;
  height: 300px;
  background-color: white;
  border: 0.5px solid rgb(200, 200, 200);
  overflow: hidden;
  .btnContainer {
    text-align: left;
    padding: 25px 25px;
    height: 100%;
    overflow-y: scroll;
  }
`;

export const MenuBtnBox = styled.div`
  width: 100%;
  text-align: left;
  background-color: white;
  border: 0.5px solid rgb(200, 200, 200);
  overflow-x: hidden;
  /* scroll-behavior: smooth; */
  ::-webkit-scrollbar-thumb {
    background-color: black;
  }

  ::-webkit-scrollbar {
    display: block;
    width: 17px;
  }

  .btnContainer {
    padding: 25px 25px;
    width: 100%;
    height: 150px;
  }
`;

export const MenuBtnContainer = styled.div`
  margin-top: 35px;
  text-align: left;
`;

export const CategoryAddContainer = styled.div`
  margin-top: 35px;
  text-align: center;

  input {
    display: block;
    margin-top: 50px;
    margin-left: 20%;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid black;
  }

  .categoryAddBtn {
    margin-left: 20%;
    margin-right: 30px;
    background-color: skyblue;
    width: 20%;
    margin-top: 1.5rem;
    padding: 10px;
    color: white;
    border: none;
    &:hover {
      background-color: deepskyblue;
    }
    &:focus {
      background-color: deepskyblue !important;
    }
  }

  .categoryUpdateBtn {
    margin-right: 30px;
    background-color: rgb(130, 170, 154);
    width: 20%;
    margin-top: 1.5rem;
    padding: 10px;
    color: white;
    border: none;
    &:hover {
      background-color: rgb(78, 102, 92);
    }
    &:focus {
      background-color: rgb(78, 102, 92) !important;
    }
  }

  .categoryBackBtn {
    margin-right: 30px;
    background-color: rgb(200, 100, 100);
    width: 20%;
    margin-top: 1.5rem;
    padding: 10px;
    color: white;
    border: none;
    &:hover {
      background-color: rgb(136, 0, 0);
    }
    &:focus {
      background-color: rgb(136, 0, 0) !important;
    }
  }
`;

// export const TextOn = keyframes`

//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }

// `;

export const ErrorText = styled.p`
  color: red;
`;

export const AddConContainer = styled(Row)`
  height: auto;
`;