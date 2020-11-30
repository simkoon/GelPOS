import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/IdPassFind.scss';
import * as authAPI from '../../../lib/api/auth';
import {
  IdFindPageTitle,
  PassChangePageTitle,
  CodeCheckPageInput,
  PwChangePage,
  PwChangePageTitle,
} from './Page';

function reducer(state, action) {
  switch (action.type) {
    case 'IDFINDPAGE':
      return {
        ...state,
        mainPage: false,
        passChangePage: false,
        codeCheckPage: true,
        idFindPage: true,
      };

    case 'PASSCHANGEPAGE':
      return {
        ...state,
        mainPage: false,
        passChangePage: true,
        codeCheckPage: true,
        idFindPage: false,
        idReport: false,
      };

    case 'EMAILERROR':
      return {
        ...state,
        errorText: '이메일을 입력해 주세요.',
      };

    case 'EMAILERROR_NOOVERRLAP':
      return {
        ...state,
        email: '',
        errorText: '존재하지 않는 이메일 입니다.',
      };
    case 'CODE_NO':
      return {
        ...state,
        errorTextColor: false,
        errorText: '코드가 일치하지 않습니다.',
      };
    case 'CODESEND':
      return {
        ...state,
        codesendOk: true,
        errorTextColor: true,
        errorText: '코드전송을 성공 하였습니다.',
      };
    case 'BACK':
      return {
        mainPage: true,
        idFindPage: false,
        passChangePage: false,
        codeCheckPage: false,
        codesendOk: false,
        email: '',
        errorText: '',
        code: '',
        codeconfirm: false,
      };
    case 'ID_OK_CODE':
      return {
        ...state,
        idReport: true,
        idFindPage: false,
        codeCheckPage: false,
        errorText: '',
      };
    case 'PW_OK_CODE':
      return {
        ...state,
        pwChange: true,
        passChangePage: false,
        codeCheckPage: false,
        errorText: '',
      };
    case 'PWCONFIRM_ERROR':
      return {
        ...state,
        errorText: '비밀번호가 일치하지 않습니다.',
      };
    case 'PASSWORD_REG_ERROR':
      return {
        ...state,
        errorText:
          '비밀번호는 대문자와 특수문자를 포함한 8~16글자 이어야 합니다.',
      };
    case 'PWCHANGE_OK':
      return {
        ...state,
        pwChangeOk: true,
        pwChange: false,
        errorText: '비밀번호 변경이 완료 되었습니다.',
      };
    case 'ERRORSET':
      return {
        ...state,
        errorText: '',
      };
  }
  return {
    ...state,
    [action.name]: action.value,
  };
}

function IdPassFind() {
  const [state, dispatch] = useReducer(reducer, {
    mainPage: true,
    idFindPage: false,
    passChangePage: false,
    codeCheckPage: false,
    codesendOk: false,
    email: '',
    errorText: '',
    code: '',
    idReport: false,
    pwChange: false,
    password: '',
    passwordConfirm: '',
    pwChangeOk: false,
    errorTextColor: false,
  });

  const {
    mainPage,
    idFindPage,
    passChangePage,
    codeCheckPage,
    codesendOk,
    email,
    errorText,
    code,
    idReport,
    pwChange,
    password,
    passwordConfirm,
    pwChangeOk,
    errorTextColor,
  } = state;

  const [userid, setUserid] = useState('');

  const [emailCode, setEmailCode] = useState('');

  //input값 체인지
  const onChange = (e) => {
    dispatch(e.target);
  };

  const codeSend = async (e) => {
    dispatch({ type: 'ERRORSET' });
    e.preventDefault();

    if ([email].includes('')) {
      dispatch({ type: 'EMAILERROR' });
      return;
    }

    //이메일 유효성 검증

    // const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    // if (!emailRegExp.test(email)) {
    //   dispatch({ type: "EMAIL_REG_ERROR" });
    //   return;
    // }
    const formData = {
      email,
    };
    try {
      const result = await authAPI.findCode(formData);

      // 있는 아이디인지 체크
      if (result.data.emailoverlap) {
        return dispatch({ type: 'EMAILERROR_NOOVERRLAP' });
      }

      const servercode = result.data.code;

      setUserid(result.data.id + '****');

      setEmailCode(servercode);

      dispatch({ type: 'CODESEND' });

      return;
    } catch (e) {
      console.log(e);
    }
  };

  const codeCheck = async (e) => {
    e.preventDefault();

    console.log('emailCode', emailCode);

    if (code !== '') {
      if (code === emailCode) {
        if (idFindPage) {
          dispatch({ type: 'ID_OK_CODE' });
          return;
        }
        if (passChangePage) {
          dispatch({ type: 'PW_OK_CODE' });
          return;
        }
      } else {
        console.log('실패');
        dispatch({ type: 'CODE_NO' });
        return;
      }
    }
  };

  // 돌아가기 누를떄 실행
  const onBack = () => {
    dispatch({ type: 'BACK' });
  };

  // 비밀번호 변경에서 확인을 누를때 실행
  const onPwCheck = async () => {
    dispatch({ type: 'ERRORSET' });
    if (!(password === passwordConfirm)) {
      dispatch({ type: 'PWCONFIRM_ERROR' });
      return;
    }

    // 비밀번호 유효성 검사
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/;

    if (
      !passwordRegExp.test(password) ||
      !passwordRegExp.test(passwordConfirm)
    ) {
      dispatch({ type: 'PASSWORD_REG_ERROR' });
      return;
    }

    try {
      const passEmail = {
        password: password,
        email: email,
      };

      const result = await authAPI.pwChange(passEmail);

      if (result) {
        dispatch({ type: 'PWCHANGE_OK' });
        return;
      }

      if (!result) {
        dispatch({ type: 'PWCHANGE_ERROR' });
        return;
      }
      // if (result.data.emailoverlap) {
      //   return dispatch({ type: "EMAILERROR_NOOVERRLAP" });
      // }

      return;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {pwChangeOk ? (
        <>
          <div>
            <div className="idpassfind_logo">비밀번호 변경 완료</div>
            <hr className="idpassfind_hr" />
            <div className="idpassfind_text">
              비밀번호 변경이 완료 되었습니다.
            </div>
          </div>
          <p>
            <Link to="/">
              <button className="idpassfind_back mt-5">돌아가기</button>
            </Link>
          </p>
        </>
      ) : (
        <>
          {mainPage && (
            <>
              <div className="idpassfind_logo"> 아이디 비밀번호 찾기 </div>
              <hr className="idpassfind_hr" />
            </>
          )}
          {/* 아이디 찾기 인증 타이틀*/}
          {idFindPage && (
            <>
              <IdFindPageTitle />
            </>
          )}
          {idReport && (
            <>
              <div className="idpassfind_logo">아이디 찾기</div>
              <hr className="idpassfind_hr" />
            </>
          )}

          {/* 비밀번호 변경 인증 타이틀*/}
          {passChangePage && (
            <>
              <PassChangePageTitle />
            </>
          )}

          {/* 비밀번호 변경 타이틀*/}
          {pwChange && (
            <>
              <PwChangePageTitle />
            </>
          )}

          {mainPage && (
            <p>
              <button
                className="idpassfind_btn"
                onClick={() => dispatch({ type: 'IDFINDPAGE' })}
              >
                아이디찾기
              </button>
              <button
                className="idpassfind_btn"
                onClick={() => dispatch({ type: 'PASSCHANGEPAGE' })}
              >
                비밀번호 변경
              </button>
            </p>
          )}
          {/* 코드 인증 부분 */}
          {codeCheckPage && (
            <CodeCheckPageInput
              codeCheckPage={codeCheckPage}
              codeSend={codeSend}
              codesendOk={codesendOk}
              email={email}
              onChange={onChange}
              code={code}
              codeCheck={codeCheck}
            />
          )}

          {/* 비밀번호 변경 페이지 */}
          {pwChange && (
            <>
              <PwChangePage
                onChange={onChange}
                password={password}
                passwordConfirm={passwordConfirm}
                errorText={errorText}
                onPwCheck={onPwCheck}
              />
            </>
          )}

          {/* 아이디 보여주기 페이지 */}
          {idReport && (
            <p className="pt-5">회원님의 아이디는 [ {userid} ] 입니다.</p>
          )}
          {/* 에러 텍스트 (비밀번호 변경 페이지가 아닐때만 보여준다)*/}
          {!pwChange && !mainPage ? (
            <p className="errorTextBox">
              {errorText !== '' ? (
                errorTextColor ? (
                  <span className="errorText white">{errorText}</span>
                ) : (
                  <span className="errorText on">{errorText}</span>
                )
              ) : (
                <span className="errorText">{errorText}</span>
              )}
            </p>
          ) : null}
          {/* 페이지에 다르게 돌아가기 바꿔주기 */}
          {mainPage || idReport ? (
            <p>
              <Link to="/">
                <button className="idpassfind_back mt-5">돌아가기</button>
              </Link>
            </p>
          ) : pwChange ? null : (
            <p>
              <button onClick={onBack} className="idpassfind_back mt-5">
                돌아가기
              </button>
            </p>
          )}
        </>
      )}
    </>
  );
}

export default IdPassFind;
