import React, { useReducer, useState, useCallback } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../comm/Sidebar/Tsidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import * as menuAPI from "../../lib/api/menu";
import CreatableSelect from "react-select/creatable";

const AddCon = styled.div`
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

  .categoryBtn {
    background-color: skyblue;
    margin-top: 0.5rem;
    color: white;
    border: none;
    &:hover {
      background-color: deepskyblue;
    }
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

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

function AddMenu() {
  const [value, setValue] = useState();
  const [options, setOptions] = useState([
    { value: "치킨", label: "치킨" },
    { value: "햄버거", label: "햄버거" },
    { value: "피자", label: "피자" },
    { value: "사이드", label: "사이드" },
  ]);

  const handleChange = useCallback((inputValue) => setValue(inputValue), []);
  const handleCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newValue]);
      setValue(newValue);
    },
    [options]
  );

  const [state, dispatch] = useReducer(reducer, {
    menuName: "",
    menuPrice: "",
    menuCategory: "",
  });

  const { menuName, menuPrice } = state;

  const onChange = (e) => {
    dispatch(e.target);
  };

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const onSubmit = async (event) => {
    event.preventDefault();

    const storeid = user.nowstore;

    try {
      const formData = {
        value: value.value,
        menuName,
        menuPrice,
        storeid,
      };

      const result = await menuAPI.addMenu(formData);
      console.log(formData);
    } catch (e) {
      const resulterror = e.response.status;
      console.log(resulterror);
    }
  };

  return (
    <AddCon>
      <Sidebar>
        <Container
          fluid
          className="h-100 w-50 justify-content-center"
          style={{
            boxSizing: "border-box",
            padding: "0px",
            margin: "0px",
            flex: 1,
          }}
        >
          <Row className="p-4 m-1 pt-0 h-100" style={{ flex: 1 }}>
            <Col className="addMenuCol" md={{ span: 8, offset: 8 }}>
              <h2>메뉴추가</h2>
              <form onSubmit={onSubmit}>
                <CreatableSelect
                  isClearable
                  name="menuCategory"
                  value={value}
                  options={options}
                  onChange={handleChange}
                  onCreateOption={handleCreate}
                />
                <p className="underSelectP">
                  {" "}
                  * 위 박스에 입력하시면 카테고리가 추가됩니다.
                </p>
                <input
                  type="text"
                  placeholder="메뉴 이름"
                  name="menuName"
                  className="AddConInput"
                  onChange={onChange}
                  value={menuName}
                ></input>
                <br />
                <input
                  type="text"
                  placeholder="메뉴 가격"
                  name="menuPrice"
                  className="AddConInput"
                  onChange={onChange}
                  value={menuPrice}
                ></input>
                <br />
                <button className="menuButton" className="menuAddBtn">
                  메뉴 추가
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </Sidebar>
    </AddCon>
  );
}

export default AddMenu;
