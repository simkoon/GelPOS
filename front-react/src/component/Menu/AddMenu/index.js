import React from "react";
import { Button } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

function AddMenu({
  onChange,
  onSubmit,
  value,
  options,
  handleChange,
  handleCreate,
  menuName,
  menuPrice,
  isCategory,
}) {
  return (
    <>
      <h2>{isCategory.name} 메뉴추가</h2>
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
        <Button className=" menuAddBtn">추가 및 수정</Button>
        <Button className=" menuDelBtn">삭제</Button>
      </form>
    </>
  );
}

export default AddMenu;
