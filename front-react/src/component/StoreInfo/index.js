import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import StInfomation from './Main/StInformation';
import StoreInfoBtn from './comm/StoreInfoBtn';
import { useSelector } from 'react-redux';
import { MainContainer } from './CSS/indexCss';
import Menu from '../Menu';
import Table from './Table';
import styled from 'styled-components';

const MenuContainer = styled(Row)`
  @media all and (max-width: 1700px) {
    margin-left: 200px;
  }
  @media all and (max-width: 1475px) {
    margin-left: 400px;
  }
  @media all and (max-width: 1115px) {
    margin-left: 700px;
  }
`;

const TableContainer = styled(Row)`
  @media all and (max-width: 1760px) {
    margin-left: 200px;
  }
  @media all and (max-width: 1535px) {
    margin-left: 400px;
  }
  @media all and (max-width: 1115px) {
    margin-left: 700px;
  }
`;

function StoreInfo() {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  // 뽑아오는 가게정보 state에 저장해주기
  const [info, setInfo] = useState({
    name: '',
    regNumber: '',
    address: '',
    expiredDate: '',
  });
  // 애니메이션 주는데 사용
  const [Animation, setAnimation] = useState('');

  // 무슨 버튼을 눌렀는지 확인
  const [isPage, setIsPage] = useState('');

  useEffect(() => {
    // 가게 정보 뽑아오기

    const storeid = user.nowstore;

    // 배열 속에 지금 들어가 있는 스토어의 값을 검색 해온다.
    const store = user.store.filter((it) => new RegExp(storeid).test(it._id));

    setInfo({
      name: [store[0].name],
      regNumber: [store[0].regNumber],
      address: [store[0].address],
      expiredDate: [store[0].expiredDate.substring(0, 10)],
    });
  }, []);

  // 버튼 클릭 할때마다 반응 주기
  const onBtnClick = (e) => {
    setAnimation('true');
    setIsPage(e.target.value);
  };

  const offBtnClick = (e) => {
    setAnimation('false');
    setIsPage('');
  };

  return (
    <>
      <div style={{ height: '100%' }}>
        <MainContainer Animation={Animation}>
          <Row style={{ width: '100%' }}>
            <StInfomation
              Animation={Animation}
              storeName={info.name}
              storeAddress={info.address}
              storeRegNumber={info.regNumber}
              storeExPiredDate={info.expiredDate}
            />
            <StoreInfoBtn onBtnClick={onBtnClick} Animation={Animation} />
          </Row>
          {isPage === 'MenuAdd' && (
            <MenuContainer>
              <Menu offBtnClick={offBtnClick} />
            </MenuContainer>
          )}
          {isPage === 'TableAdd' && (
            <TableContainer>
              <Table offBtnClick={offBtnClick} />
            </TableContainer>
          )}
        </MainContainer>
      </div>
    </>
  );
}

export default StoreInfo;
