import React, { useState, useEffect, useReducer } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
  AddCon,
  TableBtnBox,
  TableBtnContainer,
  TableBtn,
  NewTableBtn,
  TextInput,
} from './TableCss';
import * as tableAPI from '../../../lib/api/table';
import { useSelector } from 'react-redux';

function reducer(state, action) {
  // 값 다 지워주기
  switch (action.type) {
    case 'RESET':
      return {
        ...state,
        tableName: '',
        errorText: '',
        isTablename: '',
        isTableId: '',
      };
    case 'ADD_ERROR':
      return {
        ...state,
        errorText: '이름을 입력해 주세요.',
      };
    case 'TABLECLICK':
      return {
        ...state,
        isTablename: action.name,
        isTableId: action.id,
      };
  }
  return {
    ...state,
    [action.name]: action.value,
  };
}

function Table({ offBtnClick }) {
  const [state, dispatch] = useReducer(reducer, {
    tableName: '',
    errorText: '',
    isTablename: '',
    isTableId: '',
  });

  const { tableName, errorText, isTablename, isTableId } = state;

  // 테이블 버튼
  const [Table, setTable] = useState();

  // 테이블 Add 모달
  const [modaltableAdd, setModalTableAdd] = useState(false);

  // 테이블 클릭 모달
  const [modalTable, setModalTable] = useState(false);

  // 테이블 삭제 확인 모달
  const [modalTableDel, setModalTableDel] = useState(false);

  // 유저 가게 아이디 가져오기
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const storeid = user.nowstore;

  // 테이블 리스트 가져오기
  const tableList = async () => {
    const result = await tableAPI.tableList(storeid);

    setTable(
      result.data.map((table) => {
        const date = table.startAt ? table.startAt.substring(0, 10) : '';
        return (
          <TableBtn
            onClick={() => onClickTableBtn(table.name, table._id)}
            name={table.name}
            key={table._id}
            value={table._id}
          >
            테이블 이름: {table.name}
            <br />
            <span style={{ color: 'deepskyblue' }}>생성날짜: {date}</span>
          </TableBtn>
        );
      })
    );
  };

  // 테이블 추가
  const tableAdd = async () => {
    const formData = {
      storeid: storeid,
      tablename: tableName,
    };

    const result = await tableAPI.tableAdd(formData);
  };

  // 테이블 삭제
  const tableDel = async () => {
    const formData = {
      storeid: storeid,
      tableid: isTableId,
    };

    const result = await tableAPI.tableDel(formData);
  };

  // 테이블 수정
  const tableUpdate = async () => {
    const formData = {
      storeid: storeid,
      tableid: isTableId,
      newtablename: tableName,
    };

    const result = await tableAPI.tableUpdate(formData);
  };

  // 랜더링 하면 테이블 리스트 뽑아주기
  useEffect(() => {
    tableList();
  }, []);

  const onChange = (e) => {
    dispatch(e.target);
  };

  // 테이블 버튼 클릭시
  const onClickTableBtn = (name, id) => {
    setModalTable(true);
    dispatch({ type: 'TABLECLICK', name, id });
  };

  // 버튼 클릭시
  const onClickBtn = async (e) => {
    // 테이블 추가 버튼 누를 때
    if (e.target.name === 'tableAddBtn') {
      if (tableName === '') {
        dispatch({ type: 'ADD_ERROR' });
      }
      await tableAdd();
      setModalTableAdd(false);
      tableList();
      dispatch({ type: 'RESET' });
    }

    // 테이블 삭제 버튼 누를 때
    if (e.target.name === 'tableDelBtn') {
      setModalTable(false);
      setModalTableDel(true);
    }

    // 테이블 삭제 확인 버튼을 누를 때
    if (e.target.name === 'tableDeleteOkBtn') {
      await tableDel();
      tableList();
      setModalTable(false);
      setModalTableDel(false);
      dispatch({ type: 'RESET' });
    }

    // 테이블 수정 버튼을 누를 때
    if (e.target.name === 'tableUpdateBtn') {
      if (tableName === '') {
        dispatch({ type: 'ADD_ERROR' });
        return;
      }
      await tableUpdate();
      tableList();
      setModalTable(false);
      dispatch({ type: 'RESET' });
    }
  };

  return (
    <>
      <AddCon>
        <Button className="offBtn" onClick={offBtnClick}>
          돌아가기
        </Button>
        <h1>테이블</h1>
        <br />
        <br />
        <TableBtnBox>
          <TableBtnContainer>
            {Table}
            <NewTableBtn onClick={() => setModalTableAdd(true)} name="tableAdd">
              +
            </NewTableBtn>
          </TableBtnContainer>
        </TableBtnBox>

        {/* 테이블 추가 */}
        <Modal
          show={modaltableAdd}
          onHide={() => {
            setModalTableAdd(false);
            dispatch({ type: 'RESET' });
          }}
        >
          <Modal.Header>
            <h2>테이블 </h2>
          </Modal.Header>
          <Modal.Body>
            <TextInput
              onChange={onChange}
              text="text"
              placeholder="테이블 이름"
              name="tableName"
              autoComplete="off"
              value={tableName}
              maxLength="8"
            />
            <p className="underSelectP">* 1자 이상 8자 이하로 입력해 주세요.</p>
            {errorText !== '' && (
              <div error={errorText} style={{ color: 'red' }}>
                {errorText}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-primary"
              className="categoryAddBtn"
              name="tableAddBtn"
              onClick={onClickBtn}
            >
              추가
            </Button>
            <Button
              variant="outline-dark"
              className="categoryBackBtn"
              onClick={() => {
                setModalTableAdd(false);
                dispatch({ type: 'RESET' });
              }}
            >
              취소
            </Button>
          </Modal.Footer>
        </Modal>

        {/* 테이블 클릭시 화면 */}
        <Modal
          show={modalTable}
          onHide={() => {
            setModalTable(false);
            dispatch({ type: 'RESET' });
          }}
        >
          <Modal.Header>
            <h2>
              <span style={{ color: 'blue' }}>{isTablename}</span> 테이블{' '}
            </h2>
          </Modal.Header>
          <Modal.Body>
            <TextInput
              onChange={onChange}
              text="text"
              placeholder={isTablename}
              name="tableName"
              autoComplete="off"
              value={tableName}
              maxLength="8"
            />
            <p className="underSelectP">* 1자 이상 8자 이하로 입력해 주세요.</p>
            {errorText !== '' && (
              <div error={errorText} style={{ color: 'red' }}>
                {errorText}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-success"
              name="tableUpdateBtn"
              onClick={onClickBtn}
            >
              수정
            </Button>
            <Button
              variant="outline-danger"
              color="success"
              name="tableDelBtn"
              onClick={onClickBtn}
            >
              삭제
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => {
                setModalTable(false);
                dispatch({ type: 'RESET' });
              }}
            >
              취소
            </Button>
          </Modal.Footer>
        </Modal>

        {/* 테이블 삭제시 재차 확인 모달 */}
        <Modal
          size="md"
          show={modalTableDel}
          onHide={() => setModalTableDel(false)}
        >
          <Modal.Header>
            <h2>
              테이블
              <span style={{ color: 'red' }}>삭제</span>
            </h2>
          </Modal.Header>
          <Modal.Body>
            정말 <span style={{ color: 'blue' }}>{isTablename}</span> 테이블을
            삭제 하시겠습니까?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-danger"
              className="categoryBackBtn"
              name="tableDeleteOkBtn"
              color="danger"
              onClick={onClickBtn}
            >
              삭제
            </Button>
            <Button
              variant="outline-dark"
              className="categoryBackBtn"
              onClick={() => {
                setModalTableDel(false);
                setModalTable(true);
              }}
            >
              취소
            </Button>
          </Modal.Footer>
        </Modal>
      </AddCon>
    </>
  );
}

export default Table;
