import React, { useReducer, useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as menuAPI from "../../lib/api/menu";
import CreatableSelect from "react-select/creatable";
import { useSelector } from "react-redux";
import { AddCon, CategoryBtn, CategoryBtnBox } from "./CSS/AddMenuCss";

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

  const [category, setCategory] = useState();

  // 카테고리 버튼 움직임을 주기위한 marhin 설정 값
  //const [categoryMargin, setCategoryMargin] = useState(0);

  //유저 가게 아이디 가져오기
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const storeid = user.nowstore;

  // 가게 아이디로 메뉴 리스트 뽑아오기
  useEffect(async () => {
    const result = await menuAPI.menuList(storeid);

    const AllCategory = [];
    result.data.map((category) => AllCategory.push(category.name));
    console.log("카테고리값만 뽑기", AllCategory);

    //중복 카테고리 제거
    // const uniqCategory = AllCategory.reduce(function (a, b) {
    //   if (a.indexOf(b) < 0) a.push(b);
    //   return a;
    // }, []);

    setCategory(
      AllCategory.map((category) => (
        <CategoryBtn onClick={onCategoryBtn} name={category}>
          {category}
        </CategoryBtn>
      ))
    );

    console.log("최종 중복제거 후 뽑아온 카테고리들", category);
  }, []);

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

  const onSubmit = async (event) => {
    event.preventDefault();

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

  const onCategoryBtn = (e) => {
    console.log("onCategoryBtn으로 넘어오는 값", e.target.name);
  };

  // categoryMargin 버튼을 누렀을때 값 주기

  return (
    <AddCon>
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
        <Row>
          <Col className="addMenuCol">
            <h2>카테고리 목록</h2>
            <CategoryBtnBox>
              <div className="btnContainer">
                {category}
                {category}
                {category}
                {category}
                {category}
                {category}
              </div>
            </CategoryBtnBox>
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
    </AddCon>
  );
}

export default AddMenu;
