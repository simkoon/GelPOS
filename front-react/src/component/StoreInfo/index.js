import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
//import styled from 'styled-components';
import StInfomation from "./Main/StInformation";
import StoreInfoBtn from "./Main/StoreInfoBtn";
import { useSelector } from "react-redux";

function StoreInfo() {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeRegNumber, setStoreRegNumber] = useState("");
  const [storeExPiredDate, setStoreExPiredDate] = useState("");

  useEffect(() => {
    // 가게 정보 뽑아오기

    const storeid = user.nowstore;

    // 배열 속에 지금 들어가 있는 스토어의 값을 검색 해온다.
    const store = user.store.filter((it) => new RegExp(storeid).test(it._id));

    setStoreName(store[0].name);

    setStoreAddress(store[0].regNumber);

    setStoreRegNumber(store[0].address);

    setStoreExPiredDate(store[0].expiredDate.substring(0, 10));

    console.log(user);
  }, []);

  return (
    <>
      <div
        style={{ height: "100%", maxWidth: "1400px" }}
        className="align-items-center mx-auto"
      >
        <Row className="w-100" style={{ flex: 1 }}>
          <StInfomation
            storeName={storeName}
            storeAddress={storeAddress}
            storeRegNumber={storeRegNumber}
            storeExPiredDate={storeExPiredDate}
          />
          <StoreInfoBtn />
        </Row>
      </div>
    </>
  );
}

export default StoreInfo;
