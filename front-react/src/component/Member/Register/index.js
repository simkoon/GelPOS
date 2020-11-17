import React, { useReducer, useState } from "react";

import { Link, withRouter } from "react-router-dom";
import * as authAPI from "../../../lib/api/auth";
import EmailCodeInput from "../EmailCodeCheck/EmailCodeInput";
import CodeSendButton from "../EmailCodeCheck/CodeSendButton";
import CodeInput from "../EmailCodeCheck/CodeInput";

function reducer(state, action) {
  switch (action.type) {
    case "USERNAME_REG_ERROR":
      return {
        ...state,
        error: "이름을 형식에 맞게 입력해주세요.",
        errortext: false,
      };
    case "USERID_REG_ERROR":
      return {
        ...state,
        error: "아이디를 형식에 맞게 입력해주세요.",
        errortext: false,
      };
    case "EMAILERROR":
      return {
        ...state,
        error: "이메일을 입력해 주세요.",
        errortext: false,
      };
    case "IDERROR_OVERRLAP":
      return {
        ...state,

        error: "이미 존재하는 아이디 입니다.",
        errortext: false,
      };
    case "EMAILERROR_OVERRLAP":
      return {
        ...state,
        error: "이미 존재하는 이메일 입니다.",
        errortext: false,
      };

    case "EMAIL_REG_ERROR":
      return {
        ...state,
        error: "이메일 형식을 맞춰서 입력해주세요.",
        errortext: false,
      };
    case "CODESEND":
      return {
        ...state,
        error: "코드가 전송되었습니다.",
        errortext: true,
        codesend: true,
      };
    case "CODE_OK":
      return {
        ...state,
        error: "코드 인증을 성공하였습니다.",
        errortext: true,
        codeconfirm: true,
      };
    case "CODE_NO":
      return {
        ...state,
        error: "코드 번호가 일치하지 않습니다.",
        errortext: false,
      };
    case "CODECONFIRM_ERROR":
      return {
        ...state,
        error: "코드인증을 해주세요.",
        errortext: false,
      };

    case "PASSWORDERROR":
      return {
        ...state,
        error: "비밀번호를 입력해 주세요.",
        errortext: false,
      };

    case "PASSWORD_REG_ERROR":
      return {
        ...state,
        error: "비밀번호는 대문자와 특수문자를 포함한 8~16글자 이어야 합니다.",
        errortext: false,
      };

    case "PASSWORD_CF_ERROR":
      return {
        ...state,
        error: "비밀번호 확인이 일치하지 않습니다.",
        errortext: false,
      };
  }
  return {
    ...state,
    [action.name]: action.value,
  };
}

function Register({ history }) {
  const [state, dispatch] = useReducer(reducer, {
    userid: "",
    username: "",
    password: "",
    email: "",
    passwordConfirm: "",
    error: "",
    errortext: false,
    code: "",
    codesend: false,
    codeconfirm: false,
  });

  // 이메일 코드 값
  const [emailCode, setEmailCode] = useState("");

  // 회원가입 성공 여부
  const [RegiSuccess, setRegiSuccess] = useState(false);

  const {
    userid,
    username,
    password,
    email,
    passwordConfirm,
    error,
    errortext,
    code,
    codesend,
    codeconfirm,
  } = state;

  const onChange = (e) => {
    dispatch(e.target);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      //이름 검증
      const usernameRegExp = /^[가-힣]{2,6}$/;
      if (!usernameRegExp.test(username)) {
        dispatch({ type: "USERNAME_REG_ERROR" });
        return;
      }

      //아이디 검증
      const useridRegExp = /^[A-Za-z0-9_\-]{5,20}$/;
      if (!useridRegExp.test(userid)) {
        dispatch({ type: "USERID_REG_ERROR" });
        return;
      }

      // 코드 인증했는지 확인
      if (!codeconfirm) {
        dispatch({ type: "CODECONFIRM_ERROR" });
        return;
      }

      // 패스워드 검증
      // 패스워드 일치한지 확인
      if (password !== passwordConfirm) {
        dispatch({ type: "PASSWORD_CF_ERROR" });
        return;
      }

      // 패스워드 유효성 검사
      const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/;

      if (
        !passwordRegExp.test(password) ||
        !passwordRegExp.test(passwordConfirm)
      ) {
        dispatch({ type: "PASSWORD_REG_ERROR" });
        return;
      }

      const formData = {
        userid,
        username,
        password,
        email,
      };

      const result = await authAPI.register(formData);

      setRegiSuccess(true);

      //history.push("/");
    } catch (e) {
      const resulterror = e.response.status;
      console.log(resulterror);

      switch (resulterror) {
        case 409:
          return dispatch({ type: "IDERROR_OVERRLAP" });
        case 410:
          return dispatch({ type: "EMAILERROR_OVERRLAP" });
      }
    }
  };

  //코드 전송
  const codeSend = async (e) => {
    e.preventDefault();

    if ([email].includes("")) {
      dispatch({ type: "EMAILERROR" });
      return;
    }

    //이메일 유효성 검증

    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!emailRegExp.test(email)) {
      dispatch({ type: "EMAIL_REG_ERROR" });
      return;
    }
    const formData = {
      email,
    };
    try {
      const result = await authAPI.code(formData);

      console.log(result);

      if (result.data.emailoverlap) {
        return dispatch({ type: "EMAILERROR_OVERRLAP" });
      }

      const servercode = result.data.code;

      console.log(servercode);

      setEmailCode(servercode);

      dispatch({ type: "CODESEND" });

      dispatch({ type: "NOERROR" });

      console.log(result);
      return;
    } catch (e) {
      console.log(e);
    }
  };

  // 입력한 코드값 비교
  const codeCheck = async (e) => {
    e.preventDefault();

    console.log("emailCode", emailCode);
    if (code !== "") {
      if (code === emailCode) {
        console.log("성공");
        dispatch({ type: "CODE_OK" });
        return;
      } else {
        console.log("실패");
        dispatch({ type: "CODE_NO" });
        return;
      }
    }
  };

  const onOkCleck = () => {
    history.push("/");
  };

  return (
    <>
      <div className="registBox">
        <div className="regist_logo">회원가입</div>
        <hr className="regist_hr" />
        {RegiSuccess ? (
          <div>
            <h2 className="mt-5 mb-5">회원가입에 성공하셨습니다.</h2>
            <button className="regist_btn mt-5" onClick={onOkCleck}>
              {" "}
              돌아가기{" "}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <p className="inputTextBox">
              <input
                className="regist_inputBox regist_name"
                name="username"
                type="text"
                value={username}
                onChange={onChange}
                autoComplete="off"
                placeholder="이름"
                required
              />
            </p>
            <p className="inputTextBox">
              <input
                className="regist_inputBox regist_id"
                name="userid"
                type="text"
                value={userid}
                onChange={onChange}
                autoComplete="off"
                minLength="5"
                maxLength="20"
                placeholder="아이디"
                required
              />
            </p>
            <p className="inputTextBox">
              {codesend ? (
                <EmailCodeInput
                  className="regist_inputBox regist_email readonlyInput"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChange}
                  autoComplete="off"
                  maxLength="24"
                  placeholder="이메일"
                  readOnly="readOnly"
                />
              ) : (
                <EmailCodeInput
                  className="regist_inputBox regist_email"
                  email={email}
                  onChange={onChange}
                  required="required"
                />
              )}
              {/* 코드 인증 확인 되면 버튼 없애기 */}
              {codeconfirm ? null : codesend ? (
                <CodeSendButton
                  className="codeBtn regist_email_codeSend mt-1"
                  codeSend={codeSend}
                  BtnName="다시전송"
                ></CodeSendButton>
              ) : (
                <CodeSendButton
                  className="codeBtn regist_email_codeSend mt-1"
                  codeSend={codeSend}
                  BtnName="코드전송"
                ></CodeSendButton>
              )}
            </p>
            <p className="inputTextBox">
              {codeconfirm ? (
                <CodeInput
                  className="regist_email_code ml-2 readonlyInput"
                  code={code}
                  onChange={onChange}
                  readOnly
                />
              ) : (
                <CodeInput
                  className="regist_email_code ml-2"
                  code={code}
                  onChange={onChange}
                  required
                />
              )}
              {/* 코드 인증 확인 되면 버튼 없애기 */}
              {codeconfirm ? null : (
                <button
                  className="codeBtn regist_email_codeOk"
                  onClick={codeCheck}
                >
                  확인
                </button>
              )}
            </p>
            <p className="inputTextBox">
              <input
                className="regist_inputBox regist_pass"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                autoComplete="off"
                minLength="8"
                maxLength="16"
                placeholder="비밀번호"
                required
              />
            </p>
            <p className="inputTextBox">
              <input
                className="regist_inputBox regist_pass"
                name="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={onChange}
                autoComplete="off"
                minLength="8"
                maxLength="16"
                placeholder="비밀번호 확인"
                required
              />
            </p>

            {errortext ? (
              <p className="text-white">{error}</p>
            ) : (
              <p className="text-warning">{error}</p>
            )}
            <p>
              <button className="regist_btn">회원가입</button>
              <Link to="/">
                <button className="regist_back">돌아가기</button>
              </Link>
            </p>
          </form>
        )}
      </div>
    </>
  );
}

export default withRouter(Register);
