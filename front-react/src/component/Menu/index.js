import React, { useReducer, useState, useCallback, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as menuAPI from "../../lib/api/menu";
import { useSelector } from "react-redux";
import {
  AddConContainer,
  AddCon,
  CategoryBtn,
  CategoryBtnBox,
  MenuBtnBox,
  MenuBtn,
  NewMenuBtn,
  NewCategoryBtn,
  MenuBtnContainer,
  CategoryAddContainer,
  ErrorText,
} from "./CSS/AddMenuCss";
import addComma from "../../utility/addComma";

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
    case "RESET_CATEGORY_VALUE":
      return {
        ...state,
        menuName: "",
        menuPrice: "",
        isMenuPage: "",
      };

    // 카테고리 추가 버튼
    case "CATEGORY_ADD_OPEN":
      return {
        ...state,
        isPage: "categoryAdd",
        categoryName: "",
        isMenuPage: "",
        errorText: "",
      };

    // 카테고리 선택시
    case "CATEGORY_OPEN":
      return {
        ...state,
        isPage: "categoryChoose",
        categoryName: action.name,
        categoryId: action.id,
      };

    // 카테고리 Add 버튼을 눌렀을 때
    case "CATEGORY_ADD":
      return {
        ...state,
        isPage: "categoryChoose",
      };

    // 카테고리 생성 인풋에 아무것도 안쓰고  에러
    case "CATEGORY_ERROR":
      return {
        ...state,
        errorText: "값을 입력해 주세요.",
      };

    // 카테고리에서 메뉴 버튼을 눌렀을때
    case "CATEGORY_MENU_OPEN":
      return {
        ...state,
        isPage: "categoryMenu",
        isMenuPage: "",
      };

    // 카테고리 메인으로
    case "CATEGORY_MAIN":
      return {
        ...state,
        isPage: "main",
        categoryName: "",
        categoryId: "",
      };

    // 카테고리 수정 페이지로 이동
    case "CATEGORY_UPDATE_OPEN":
      return {
        ...state,
        isPage: "categoryUpdate",
        errorText: "",
      };

    // 메뉴 추가 페이지로 이동
    case "MENU_ADD_OPEN":
      return {
        ...state,
        isPage: "categoryMenu",
        isMenuPage: "menuAdd",
        menuName: "",
        menuPrice: "",
        menuId: "",
        errorText: "",
      };

    // 메뉴 추가 에러
    case "MENU_ADD_ERROR":
      return {
        ...state,
        isPage: "categoryMenu",
        isMenuPage: "menuAdd",
        errorText: "메뉴 이름과 메뉴 가격을 입력해 주세요.",
      };

    // 메뉴 추가 완료
    case "MENU_ADD":
      return {
        ...state,
        isPage: "categoryMenu",
        isMenuPage: "",
        menuName: "",
        menuPrice: "",
        errorText: "",
      };

    // 메뉴 페이지에서 메뉴 버튼을 클릭 했을 때
    case "MENU_OPEN":
      return {
        ...state,
        isPage: "categoryMenu",
        isMenuPage: "menu",
        menuName: action.name,
        menuPrice: action.price,
        menuId: action.id,
        errorText: "",
      };

    // 메뉴 메인으로
    case "MENU_MAIN":
      return {
        ...state,
        isPage: "categoryMenu",
        isMenuPage: "",
        menuName: "",
        menuPrice: "",
        menuId: "",
        newMenuName: "",
        newMenuPrice: "",
        errorText: "",
      };

    // 메뉴 메인으로
    case "RESET_MEUE_VALUE":
      return {
        ...state,
        isPage: "categoryMenu",
        isMenuPage: "",
        menuName: "",
        menuPrice: "",
        menuId: "",
        newMenuName: "",
        newMenuPrice: "",
        errorText: "",
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
    menuId: "",
    categoryName: "",
    categoryId: "",
    isPage: "main",
    isMenuPage: "",
    newCategoryName: "",
    newMenuName: "",
    newMenuPrice: "",
    errorText: "",
  });

  const {
    menuName,
    menuPrice,
    menuId,
    isPage,
    isMenuPage,
    categoryName,
    categoryId,
    newCategoryName,
    newMenuName,
    newMenuPrice,
    errorText,
  } = state;

  const [value, setValue] = useState([]);

  const [MenuBtnList, setMenuBtnList] = useState();

  // 불러온 카테고리
  const [category, setCategory] = useState();

  // 카테고리 버튼 움직임을 주기위한 marhin 설정 값
  // const [categoryMargin, setCategoryMargin] = useState(0);

  // 유저 가게 아이디 가져오기
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const storeid = user.nowstore;

  // 가게 아이디로 메뉴 리스트 뽑아오기
  const categoryList = async () => {
    const result = await menuAPI.categoryList(storeid);

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

  // 카테고리, 메뉴 이름이랑 가격이 변할때마다 실행
  const onChange = (e) => {
    dispatch(e.target);
  };

  // 메뉴값 받아와 뿌려주기
  async function menuList(name, value) {
    console.log("onCategoryBtn으로 넘어오는 name값", name);
    console.log("onCategoryBtn으로 넘어오는 value값", value);

    // 카테고리 가져오기
    const result = await menuAPI.categoryList(storeid);

    const categoryMenu = result.data.filter((it) =>
      new RegExp(value).test(it._id)
    )[0].menu;

    setMenuBtnList(
      categoryMenu.map((menu) => (
        <MenuBtn
          onClick={onMenuBtn}
          name={menu.name}
          value={menu.price}
          id={menu._id}
          key={menu._id}
        >
          {menu.name}
        </MenuBtn>
      ))
    );
  }

  // 카테고리 버튼을 누렀을때 메뉴값 받아오기
  const onCategoryBtn = async (e) => {
    console.log("onCategoryBtn으로 넘어오는 name값", e.target.name);
    console.log("onCategoryBtn으로 넘어오는 value값", e.target.value);

    // 다른 카테고리 버튼을 누를 때마다 기존 값 초기화 해주기
    dispatch({ type: "RESET_CATEGORY_VALUE" });
    setValue("");

    // 카테고리 가져오기
    menuList(e.target.name, e.target.value);

    dispatch({
      type: "CATEGORY_OPEN",
      id: e.target.value,
      name: e.target.name,
    });
  };

  const onMenuBtn = async (e) => {
    console.log("onMenuBtn으로 넘어오는 name값", e.target.name);
    console.log("onMenuBtn으로 넘어오는 value값", e.target.value);
    console.log("onMenuBtn으로 넘어오는 id값", e.target.id);

    // 다른 메뉴 버튼을 누를 때마다 기존 값 초기화 해주기
    dispatch({ type: "RESET_MEUE_VALUE" });

    dispatch({
      type: "MENU_OPEN",
      id: e.target.id,
      name: e.target.name,
      price: e.target.value,
    });
  };

  // 메뉴 목록에서 메뉴를 선택할 때마다 값이 메뉴 이름과 가격이 저절로 입력
  // useEffect(() => {
  //   console.log("value");
  //   dispatch({ type: "MENUVALUE", name: value.label, price: value.price });
  // }, [value]);

  // 카테고리 추가 실행
  const categorySub = async () => {
    const formData = {
      storeid: storeid,
      categoryname: categoryName,
    };

    const result = await menuAPI.categoryAdd(formData);

    console.log("result", result);

    categoryList();
  };

  // 카테고리 삭제 실행
  const categoryDel = async () => {
    console.log("categoryId", categoryId);

    const formData = {
      storeid: storeid,
      categoryid: categoryId,
    };

    const result = await menuAPI.categoryDel(formData);
    categoryList();

    console.log("result", result);
  };

  // 카테고리 수정 실행
  const categoryUpdate = async () => {
    const formData = {
      storeid: storeid,
      categoryid: categoryId,
      updatename: newCategoryName,
    };

    const result = await menuAPI.categoryUpdate(formData);
    categoryList();

    console.log("result", result);
  };

  // 메뉴 추가
  const menuAdd = async () => {
    const formData = {
      storeid: storeid,
      categoryid: categoryId,
      menuName,
      menuPrice,
    };

    const result = await menuAPI.menuAdd(formData);

    menuList(categoryName, categoryId);
  };

  // 메뉴 삭제 실행
  const menuDel = async () => {
    console.log("menuId", menuId);

    const formData = {
      storeid: storeid,
      categoryid: categoryId,
      menuid: menuId,
    };

    const result = await menuAPI.menuDel(formData);
    menuList(categoryName, categoryId);

    // console.log("result", result);
  };

  // 메뉴 수정 실행
  const menuUpdate = async () => {
    let formData;

    if (newMenuName === "") {
      formData = {
        storeid: storeid,
        categoryid: categoryId,
        menuid: menuId,
        updatename: menuName,
        updateprice: newMenuPrice,
      };
    } else if (newMenuPrice === "") {
      formData = {
        storeid: storeid,
        categoryid: categoryId,
        menuid: menuId,
        updatename: newMenuName,
        updateprice: menuPrice,
      };
    } else {
      formData = {
        storeid: storeid,
        categoryid: categoryId,
        menuid: menuId,
        updatename: newMenuName,
        updateprice: newMenuPrice,
      };
    }

    const result = await menuAPI.menuUpdate(formData);
    menuList(categoryName, categoryId);

    console.log("result", result);
  };

  // 버튼 클릭시 실행되는 함수
  const onClickAddBtn = (e) => {
    const targetName = e.target.name;

    switch (targetName) {
      // 카테고리 추가 버튼을 누를때
      case "categoryAdd": {
        dispatch({ type: "CATEGORY_ADD_OPEN" });
        return;
      }

      // 카테고리에서 메뉴 버튼을 누를때
      case "categoryMenuBtn": {
        dispatch({ type: "CATEGORY_MENU_OPEN" });
        return;
      }

      // 카테고리 추가해주기
      case "categoryAddBtn": {
        if (categoryName === "") {
          dispatch({ type: "CATEGORY_ERROR" });
          return;
        }
        categorySub();
        dispatch({ type: "CATEGORY_MAIN" });
        return;
      }

      // 카테고리 추가에서 취소 눌러줄 때
      case "categoryAddBackBtn": {
        dispatch({ type: "CATEGORY_ADD" });
        return;
      }

      // 카테고리 삭제를 눌렀을 때
      case "categoryDeleteBtn": {
        categoryDel();
        dispatch({ type: "CATEGORY_MAIN" });
        return;
      }

      // 카테고리 수정을 눌렀을 때
      case "categoryUpdateBtn": {
        dispatch({ type: "CATEGORY_UPDATE_OPEN" });
        return;
      }

      // 카테고리 수정에서 수정 버튼을 눌렀을 때
      case "categoryUpBtn": {
        if (newCategoryName === "") {
          dispatch({ type: "CATEGORY_ERROR" });
          return;
        }
        categoryUpdate();
        dispatch({ type: "CATEGORY_MAIN" });
        return;
      }

      // 메뉴 추가 화면으로 이동
      case "menuAdd": {
        dispatch({ type: "MENU_ADD_OPEN" });
        return;
      }

      // 메뉴 추가에서 취소 눌러줄 때
      case "menuAddBackBtn": {
        dispatch({ type: "CATEGORY_MENU_OPEN" });
        return;
      }

      // 메뉴 추가 버튼 클릭시
      case "menuAddBtn": {
        if (menuName === "" || menuPrice === "") {
          dispatch({ type: "MENU_ADD_ERROR" });
          return;
        }
        menuAdd();
        dispatch({ type: "MENU_ADD" });
        return;
      }

      // 메뉴 삭제 버튼을 눌렀을때
      case "menuDeleteBtn": {
        menuDel();
        dispatch({ type: "MENU_MAIN" });
        return;
      }

      // 메뉴 수정 버튼 클릭시
      case "menuUpdateBtn": {
        if (newMenuName === "" && newMenuPrice === "") {
          dispatch({ type: "CATEGORY_ERROR" });
          return;
        }
        menuUpdate();
        dispatch({ type: "MENU_MAIN" });
        return;
      }
    }
  };

  return (
    <AddCon>
      <AddConContainer>
        <Col md={12} xl={7}>
          {/* 카테고리 목록 */}
          <Button onClick={offBtnClick}>가게정보</Button>
          <h2>카테고리 목록</h2>
          <CategoryBtnBox>
            <div className="btnContainer">
              <NewCategoryBtn onClick={onClickAddBtn} name="categoryAdd">
                +
              </NewCategoryBtn>
              {category}
            </div>
          </CategoryBtnBox>
          <p className="underSelectP ml-5">
            * 위 박스안에 있는 카테고리를 클릭해 주세요.
          </p>
        </Col>

        {/* 카테고리 설정 선택 */}
        <Col>
          {isPage === "categoryChoose" && (
            <CategoryAddContainer>
              <h2>
                <span style={{ color: "red" }}>{categoryName}</span> 카테고리
              </h2>
              <form onClick={onClickAddBtn}>
                <Button className="categoryAddBtn" name="categoryMenuBtn">
                  메뉴
                </Button>
                <Button className="categoryUpdateBtn" name="categoryUpdateBtn">
                  수정
                </Button>
                <Button className="categoryBackBtn" name="categoryDeleteBtn">
                  삭제
                </Button>
              </form>
            </CategoryAddContainer>
          )}

          {/* 카테고리 만드는 화면 */}
          {isPage === "categoryAdd" && (
            <CategoryAddContainer>
              <h2>카테고리 </h2>
              <form onClick={onClickAddBtn}>
                <input
                  onChange={onChange}
                  text="text"
                  placeholder="카테고리 이름"
                  name="categoryName"
                  autoComplete="off"
                  value={categoryName}
                  maxLength="7"
                />
                <p className="underSelectP">
                  * 1자 이상 7자 이하로 입력해 주세요.
                </p>
                {errorText !== "" && (
                  <ErrorText error={errorText}>{errorText}</ErrorText>
                )}
                <Button className="categoryAddBtn" name="categoryAddBtn">
                  추가
                </Button>
                <Button className="categoryBackBtn" name="categoryAddBackBtn">
                  취소
                </Button>
              </form>
            </CategoryAddContainer>
          )}

          {/* 카테코리 업데이트 화면 */}
          {isPage === "categoryUpdate" && (
            <CategoryAddContainer>
              <h2>
                {" "}
                <span style={{ color: "red" }}>{categoryName}</span> 카테고리
                수정
              </h2>
              <form onClick={onClickAddBtn}>
                <input
                  onChange={onChange}
                  text="text"
                  placeholder={categoryName}
                  name="newCategoryName"
                  value={newCategoryName}
                  maxLength="7"
                />
                <p className="underSelectP">
                  * 1자 이상 7자 이하로 입력해 주세요.
                </p>
                {errorText !== "" && (
                  <ErrorText error={errorText}>{errorText}</ErrorText>
                )}
                <Button className="categoryAddBtn" name="categoryUpBtn">
                  수정
                </Button>
                <Button className="categoryBackBtn" name="categoryAddBackBtn">
                  취소
                </Button>
              </form>
            </CategoryAddContainer>
          )}

          {/* 메뉴 나타나는 화면 */}
          {isPage === "categoryMenu" && (
            <MenuBtnContainer>
              <h2>
                <span style={{ color: "red" }}>{categoryName}</span> 메뉴추가
              </h2>
              <MenuBtnBox>
                <div className="btnContainer" style={{ margin: " 0px auto" }}>
                  <NewMenuBtn onClick={onClickAddBtn} name="menuAdd">
                    +
                  </NewMenuBtn>
                  {MenuBtnList}
                </div>
              </MenuBtnBox>
              <p className="underSelectP">
                * 위 박스안에 있는 메뉴를 클릭해 주세여.
              </p>
            </MenuBtnContainer>
          )}

          {/* 메뉴 추가 화면 */}
          {isMenuPage === "menuAdd" && (
            <CategoryAddContainer>
              <h2>메뉴 추가</h2>
              <form onClick={onClickAddBtn}>
                <input
                  onChange={onChange}
                  type="text"
                  placeholder="메뉴 이름"
                  name="menuName"
                  value={menuName}
                  maxLength="7"
                  autoComplete="off"
                />
                <p className="underSelectP">
                  * 1자 이상 7자 이하로 입력해 주세요.
                </p>
                <input
                  onChange={onChange}
                  type="number"
                  placeholder="메뉴 가격"
                  name="menuPrice"
                  value={menuPrice}
                  maxLength="9"
                  autoComplete="off"
                />
                <p className="underSelectP">* 숫자로만 입력해 주세요.</p>
                {errorText !== "" && (
                  <ErrorText error={errorText}>{errorText}</ErrorText>
                )}
                <Button className="categoryAddBtn" name="menuAddBtn">
                  추가
                </Button>
                <Button className="categoryBackBtn" name="menuAddBackBtn">
                  취소
                </Button>
              </form>
            </CategoryAddContainer>
          )}

          {/* 메뉴 클릭시 화면 */}
          {isMenuPage === "menu" && (
            <CategoryAddContainer>
              <h2>
                <span style={{ color: "blue" }}>{menuName}</span>메뉴
              </h2>
              <form onClick={onClickAddBtn}>
                <input
                  onChange={onChange}
                  type="text"
                  placeholder={menuName}
                  name="newMenuName"
                  value={newMenuName}
                  maxLength="7"
                  autoComplete="off"
                />
                <p className="underSelectP">
                  * 1자 이상 7자 이하로 입력해 주세요.
                </p>
                <input
                  onChange={onChange}
                  type="number"
                  placeholder={menuPrice}
                  name="newMenuPrice"
                  value={newMenuPrice}
                  maxLength="9"
                  autoComplete="off"
                />
                <p className="underSelectP">* 숫자로만 입력해 주세요.</p>
                {errorText !== "" && (
                  <ErrorText error={errorText}>{errorText}</ErrorText>
                )}
                <Button className="categoryAddBtn" name="menuUpdateBtn">
                  수정
                </Button>
                <Button className="categoryBackBtn" name="menuDeleteBtn">
                  삭제
                </Button>
              </form>
            </CategoryAddContainer>
          )}
        </Col>
      </AddConContainer>
    </AddCon>
  );
}

export default Menu;
