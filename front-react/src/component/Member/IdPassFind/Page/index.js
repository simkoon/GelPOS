import React from "react";
import { Fade } from "react-bootstrap";
import EmailCodeInput from "../../EmailCodeCheck/EmailCodeInput";
import CodeSendButton from "../../EmailCodeCheck/CodeSendButton";
import CodeInput from "../../EmailCodeCheck/CodeInput";
import { Link } from "react-router-dom";

// 아이디 찾기 타이틀
export const IdFindPageTitle = () => {
  return (
    <>
      <div className="idpassfind_logo">아이디 찾기</div>
      <hr className="idpassfind_hr" />
      <div className="idpassfind_text">
        회원가입에 입력한 이메일로 인증을 진행해 주세요.
      </div>
    </>
  );
};

// 비밀번호 변경 코드인증 타이틀
export const PassChangePageTitle = () => {
  return (
    <>
      <div className="idpassfind_logo">비밀번호 변경</div>
      <hr className="idpassfind_hr" />
      <div className="idpassfind_text">
        회원가입에 입력한 이메일로 인증을 진행해 주세요.
      </div>
    </>
  );
};

// 코드인증 input
export const CodeCheckPageInput = ({
  codesendOk,
  codeSend,
  email,
  onChange,
  code,
  codeCheck,
}) => {
  return (
    <>
      <>
        <p>
          {codesendOk ? (
            <EmailCodeInput
              className="idpass_inputBox idpass_email readonlyInput"
              email={email}
              onChange={onChange}
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
          {codesendOk ? (
            <CodeSendButton
              className="codeBtn idpass_email_codeSend"
              codeSend={codeSend}
              BtnName="다시전송"
            ></CodeSendButton>
          ) : (
            <CodeSendButton
              className="codeBtn idpass_email_codeSend"
              codeSend={codeSend}
              BtnName="코드전송"
            ></CodeSendButton>
          )}
        </p>
        <p className="inputTextBox">
          <CodeInput
            className="regist_email_code ml-2"
            code={code}
            onChange={onChange}
            required
          />
          <button className="codeBtn regist_email_codeOk" onClick={codeCheck}>
            확인
          </button>
        </p>
      </>
    </>
  );
};
// 비밀번호 변경 페이지 타이틀
export const PwChangePageTitle = () => {
  return (
    <>
      <div className="idpassfind_logo">비밀번호 변경</div>
      <hr className="idpassfind_hr" />
      <div className="idpassfind_text">변경할 비밀번호를 입력해 주세요.</div>
    </>
  );
};

// 비밀번호 변경 페이지
export const PwChangePage = ({
  onChange,
  password,
  passwordConfirm,
  errorText,
  onPwCheck,
}) => {
  return (
    <>
      <p>
        <input
          className="idpass_inputBox idpass_email"
          type="password"
          name="password"
          autoComplete="off"
          minLength="8"
          maxLength="16"
          onChange={onChange}
          value={password}
          placeholder="비밀번호"
        />
      </p>
      <p>
        <input
          className="idpass_inputBox idpass_email"
          type="password"
          name="passwordConfirm"
          autoComplete="off"
          minLength="8"
          maxLength="16"
          onChange={onChange}
          value={passwordConfirm}
          placeholder="비밀번호 확인"
        />
      </p>
      {errorText !== "" ? (
        <span className="errorText on">{errorText}</span>
      ) : (
        <span className="errorText">{errorText}</span>
      )}
      <p>
        <button className="Ok_btn" onClick={onPwCheck}>
          확인
        </button>
        <Link to="/">
          <button className="back_btn">취소</button>
        </Link>
      </p>
    </>
  );
};
