import React, { useReducer, useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as menuAPI from "../../lib/api/menu";
import { useSelector } from "react-redux";
import { AddCon, CategoryBtn, CategoryBtnBox } from "./CSS/AddMenuCss";
import AddMenu from "./AddMenu";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

function Menu({ offBtnClick }) {
  const [state, dispatch] = useReducer(reducer, {
    menuName: "",
    menuPrice: "",
    menuCategory: "",
  });

  const { menuName, menuPrice } = state;

  const [value, setValue] = useState();

  const [options, setOptions] = useState([]);

  // 불러온 카테고리
  const [category, setCategory] = useState();

  // 선택한 카테고리
  const [isCategory, setIsCategory] = useState("");

  // 카테고리 버튼 움직임을 주기위한 marhin 설정 값
  // const [categoryMargin, setCategoryMargin] = useState(0);

  // 유저 가게 아이디 가져오기
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const storeid = user.nowstore;

  // 가게 아이디로 메뉴 리스트 뽑아오기
  const categoryList = async () => {
    const result = await menuAPI.menuList(storeid);

    // const AllCategory = [];
    // result.data.map((category) => AllCategory.push(category.name));
    // console.log("카테고리값만 뽑기", AllCategory);

    //중복 카테고리 제거
    // const uniqCategory = AllCategory.reduce(function (a, b) {
    //   if (a.indexOf(b) < 0) a.push(b);
    //   return a;
    // }, []);

    //result.data.map((category) => console.log("category", category._id));

    setCategory(
      result.data.map((category) => (
        <CategoryBtn
          onClick={onCategoryBtn}
          name={category.name}
          key={category._id}
          value={category._id}
        >
          {category.name}
        </CategoryBtn>
      ))
    );
  };

  // 처음 랜더링 될때 리스트 뽑아오기
  useEffect(async () => {
    categoryList();
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

  // categoryMargin 버튼을 누렀을때 값 받아오기
  const onCategoryBtn = async (e) => {
    console.log("onCategoryBtn으로 넘어오는 name값", e.target.name);
    console.log("onCategoryBtn으로 넘어오는 value값", e.target.value);

    // 카테고리 가져오기

    const result = await menuAPI.menuList(storeid);

    const categoryMenu = result.data.filter((it) =>
      new RegExp(e.target.value).test(it._id)
    )[0].menu;

    const ArrayMenu = new Array();

    categoryMenu.map((menu) => {
      ArrayMenu.push({
        value: e.target.value,
        label: menu.name,
      });
    });

    setOptions(options.concat(ArrayMenu));

    console.log("ArrayMenu", ArrayMenu);

    setIsCategory({
      name: e.target.name,
      id: e.target.value,
    });
  };
  console.log("Options", options);
  return (
    <AddCon>
      <Row>
        <Col>
          <Button onClick={offBtnClick}>가게정보</Button>
          <h2>카테고리 목록</h2>
          <CategoryBtnBox>
            <div className="btnContainer" style={{ margin: " 0px auto" }}>
              {category}
              {category}
              {category}
              {category}
              {category}
              {category}
              {category}
              {category}
            </div>
          </CategoryBtnBox>
          <p className="underSelectP ml-5">
            * 위 박스안에 있는 카테고리를 클릭해 주세요.
          </p>
        </Col>
        <Col>
          {isCategory !== "" && (
            <AddMenu
              handleChange={handleChange}
              handleCreate={handleCreate}
              onChange={onChange}
              onSubmit={onSubmit}
              options={options}
              value={value}
              menuName={menuName}
              menuPrice={menuPrice}
              isCategory={isCategory}
            />
          )}
        </Col>
      </Row>
    </AddCon>
  );
}

export default Menu;
