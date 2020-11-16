import React, { useReducer, useState} from "react";
import { Link } from "react-router-dom";
import "./CSS/IdPassFind.scss";
import * as authAPI from "../../../lib/api/auth";
import EmailCodeInput from "../EmailCodeCheck/EmailCodeInput";
import CodeSendButton from "../EmailCodeCheck/CodeSendButton";
import CodeInput from "../EmailCodeCheck/CodeInput";

function reducer(state, action) {
  switch (action.type) {
    case "IDFINDPAGE":
      return {
        ...state,
        mainPage : false,
        passChangePage : false,
        codeCheckPage: true,
        idFindPage: true,
      };

    case "PASSCHANGEPAGE":
      return {
        ...state,
        mainPage : false,
        passChangePage : true,
        codeCheckPage: true,
        idFindPage: false,
      };
      
    case "EMAILERROR":
      return {
        ...state,
        errorText: "이메일을 입력해 주세요."
      };
      
    case "EMAILERROR_NOOVERRLAP":
      return {
        ...state,
        email: "",
        errorText: "존재하지 않는 이메일 입니다."
      };
    case "CODE_NO":
      return {
        ...state,
        errorText: "코드가 일치하지 않습니다."
      };
    case "CODESEND":
      return {
        ...state,
        codesend: true,
        errorText: "코드인증을 성공 하였습니다."
      };
    case "BACK":
      return {
        mainPage: true,
        idFindPage: false,
        passChangePage: false,
        codeCheckPage: false,
        codesend: false,
        email: "",
        errorText: "",
        code: "",
        codeconfirm: false
      };
    case "ID_OK_CODE":
      return {
        ...state,
        idReport: true,
        idFindPage: false,
      };
  }
  return{
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
    codesend: false,
    email: "",
    errorText: "",
    code: "",
    idReport: false,
    id:"",
  });

  const {
    mainPage,
    idFindPage,
    passChangePage,
    codeCheckPage,
    codesend,
    email,
    errorText,
    code,
    idReport,
    id
  } = state;

  const [emailCode, setEmailCode] = useState("");


  //input값 체인지
  const onChange = (e) => {
    dispatch(e.target);
  };

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
      const result = await authAPI.findCode(formData);

      console.log(result);

      // 있는 아이디인지 체크
      if (!result.data.emailoverlap) {
        return dispatch({ type: "EMAILERROR_NOOVERRLAP" });
      }

      const servercode = result.data.code;

      console.log(servercode);

      setEmailCode(servercode);

      dispatch({ type: "CODESEND" });

      console.log("codesend",codesend);

      console.log(result);
      return;
    } catch (e) {
      console.log(e);
    }
  };

  const codeCheck = async (e) => {
    e.preventDefault();

    console.log("emailCode", emailCode);
    
    if (code !== "") {
      if (code === emailCode) {
        if(idFindPage){
          dispatch({ type: "ID_OK_CODE" });
        }
        // if(){
        //  dispatch({ type: "PW_OK_CODE" });
        // }
      } else {
        console.log("실패");
        dispatch({ type: "CODE_NO" });
        return;
      }
    }
  };

  const onBack = () => {
    dispatch({ type: "BACK" });
  }

  return (
    <>
      { mainPage && 
      <>
      <div className="idpassfind_logo"> 아이디 비밀번호 찾기 </div> 
      <hr className="idpassfind_hr" />
      </>
      }
      
      {/* 아이디 찾기 인증 */}
      { idFindPage && 
      <>
      <div className="idpassfind_logo">아이디 찾기</div>
      <hr className="idpassfind_hr"/>
      <div className="idpassfind_text">회원가입에 입력한 이메일로 인증을 진행해 주세요.</div> 
      </>
      }

      {idReport &&
      <>
      <div className="idpassfind_logo">아이디 찾기</div>
      <hr className="idpassfind_hr"/>

      </>
      }

      {/* 비밀번호 변경 인증 */}
      { passChangePage && 
      <>
      <div className="idpassfind_logo"> 비밀번호 변경 </div> 
      <hr className="idpassfind_hr"/>
      <div className="idpassfind_text">회원가입에 입력한 이메일로 인증을 진행해 주세요.</div>
      </>
      }
    { mainPage &&
      <p>
          <button className="idpassfind_btn" onClick={()=>dispatch({type: "IDFINDPAGE"})}>아이디찾기</button>
          <button className="idpassfind_btn" onClick={()=>dispatch({type: "PASSCHANGEPAGE"})} >비밀번호 변경</button>
      </p>
    }
    {codeCheckPage &&
      <>
      <p>
      {codesend ? (
              <EmailCodeInput
                className="idpass_inputBox idpass_email readonlyInput"
                value={email}
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
            {codesend ? (
              <CodeSendButton
                className="codeBtn idpass_email_codeSend"
                codeSend={codeSend}
                BtnName="다시전송"
              >
                
              </CodeSendButton>
            ) : (
              <CodeSendButton
                className="codeBtn idpass_email_codeSend"
                codeSend={codeSend}
                BtnName="코드전송"
              >
                
              </CodeSendButton>
            )}
          </p>
          <p className="inputTextBox">
              <CodeInput
                className="regist_email_code ml-2"
                code={code}
                onChange={onChange}
                required
              />
              <button
                className="codeBtn regist_email_codeOk"
                onClick={codeCheck}
              >
                확인
              </button>
      </p>
      </>
      }
      <span className="errorText">
      {errorText}
      </span>
      { mainPage || idReport ?
      <p>
      <Link to= "/" > 
          <button className="idpassfind_back mt-5">돌아가기</button>
        </Link>
      </p>
      :
      <p>
          <button onClick={onBack} className="idpassfind_back mt-5">돌아가기</button>
      </p>
      }
    </>
  );
}

export default IdPassFind;
