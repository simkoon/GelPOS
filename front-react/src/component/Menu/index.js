import React, { useReducer, useState, useCallback, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as menuAPI from "../../lib/api/menu";
import { useSelector } from "react-redux";
import {
  AddCon,
  CategoryBtn,
  CategoryBtnBox,
  MenuBtnBox,
  MenuBtn,
} from "./CSS/AddMenuCss";
import AddMenu from "./AddMenu";

function reducer(state, action) {
  switch (action.type) {
    // 메뉴를 고르면 메뉴 이름과 가격 값 바꿔주기
    case "MENUVALUE":
      return {
        ...state,
        menuName: action.name,
        menuPrice: action.price,
      };
    // 다른 카테고리를 고를때마다 기존 메뉴값 초기화
    case "RESET_MEUE_VALUE":
      return {
        menuName: "",
        menuPrice: "",
      };
  }
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

  const [value, setValue] = useState([]);

  const [MenuBtnList, setMenuBtnList] = useState();

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

  // 메뉴이름이랑 가격이 변할때마다 실행
  const onChange = (e) => {
    dispatch(e.target);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // 버튼의 name값 가져오기 add - 추가 및 수정 delete - 삭제 버튼
    const eventName = event.target.name;

    console.log("넘어오는 값", eventName);

    if (eventName === "add") {
      const formData = {
        name: menuName,
        price: menuPrice,
      };
    }

    // try {
    //   const formData = {
    //     value: value.value,
    //     menuName,
    //     menuPrice,
    //     storeid,
    //   };

    //   const result = await menuAPI.addMenu(formData);
    //   console.log(formData);
    // } catch (e) {
    //   const resulterror = e.response.status;
    //   console.log(resulterror);
    // }
  };

  // 카테고리 버튼을 누렀을때 메뉴값 받아오기
  const onCategoryBtn = async (e) => {
    console.log("onCategoryBtn으로 넘어오는 name값", e.target.name);
    console.log("onCategoryBtn으로 넘어오는 value값", e.target.value);

    // 다른 카테고리 버튼을 누를 때마다 기존 값 초기화 해주기
    dispatch({ type: "RESET_MEUE_VALUE" });
    setValue("");

    // 카테고리 가져오기
    const result = await menuAPI.menuList(storeid);

    const categoryMenu = result.data.filter((it) =>
      new RegExp(e.target.value).test(it._id)
    )[0].menu;

    setMenuBtnList(
      categoryMenu.map((menu) => (
        <MenuBtn name={menu.name} value={menu.price} key={menu._id}>
          {menu.name}
        </MenuBtn>
      ))
    );

    // setCategory(
    //   result.data.map((category) => (
    //     <CategoryBtn
    //       onClick={onCategoryBtn}
    //       name={category.name}
    //       key={category._id}
    //       value={category._id}
    //     >
    //       {category.name}
    //     </CategoryBtn>
    //   ))
    // );

    setIsCategory({
      name: e.target.name,
      id: e.target.value,
    });
  };

  // 메뉴 목록에서 메뉴를 선택할 때마다 값이 메뉴 이름과 가격이 저절로 입력
  useEffect(() => {
    console.log("value");
    dispatch({ type: "MENUVALUE", name: value.label, price: value.price });
  }, [value]);

  console.log("menuName", menuName);

  return (
    <AddCon>
      <Row>
        <Col>
          <Button onClick={offBtnClick}>가게정보</Button>
          <h2>카테고리 목록</h2>
          <CategoryBtnBox>
            <div className="btnContainer" style={{ margin: " 0px auto" }}>
              {category}
            </div>
          </CategoryBtnBox>
          <p className="underSelectP ml-5">
            * 위 박스안에 있는 카테고리를 클릭해 주세요.
          </p>
        </Col>
        <Col>
          {isCategory !== "" && (
            <>
              <h2>
                <span style={{ color: "red" }}>{isCategory.name}</span> 메뉴추가
              </h2>
              <MenuBtnBox>
                <div className="btnContainer" style={{ margin: " 0px auto" }}>
                  <MenuBtn
                    className=""
                    style={{ backgroundColor: "rgb(222,222,231)" }}
                  >
                    +
                  </MenuBtn>
                  {MenuBtnList}
                  {MenuBtnList}
                  {MenuBtnList}
                  {MenuBtnList}
                  {MenuBtnList}
                  {/* <div
                    style={{
                      backgroundColor: "black",
                      width: widthVal + "px",
                      display: "inline-block",
                    }}
                  >
                    a
                  </div> */}
                </div>
              </MenuBtnBox>
              <p className="underSelectP">
                * 위 박스안에 있는 메뉴를 클릭해 주세여.
              </p>
            </>
          )}
        </Col>
      </Row>
    </AddCon>
  );
}

export default Menu;
