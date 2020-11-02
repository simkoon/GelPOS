import React from 'react';
import { Link } from "react-router-dom"
import './CSS/IdPassFind.scss';

function IdFind(){
    return (
        <>
            <div className="idpassfind_logo">아이디 찾기</div>
            <hr className="idpassfind_hr"/>
            <div className="idpassfind_text">회원가입에 입력한 이메일로 인증을 진행해 주세요.</div>
            <p>
                <input className="idpass_inputBox idpass_email" type="email" placeholder="이메일"/>
                <button className="codeBtn idpass_email_codeSend">코드전송</button>
            </p>
            <p>
                <input className="idpass_email_code" type="text" placeholder="인증 코드"/>
                <button className="codeBtn idpass_email_codeOk">확인</button>
            </p>
            <p>
                <button className="Ok_btn">확인</button>
                <Link to="/member/idpassfind/idpassfindmain"><button className="back_btn">돌아가기</button></Link>
            </p>
        </>
    )
}


export default IdFind;