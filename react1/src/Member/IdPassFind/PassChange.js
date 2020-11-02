import React from 'react';
import { Link } from "react-router-dom"
import './CSS/IdPassFind.scss';

function PassCode(){
    return (
        <>
            <div className="idpassfind_logo">비밀번호 변경</div>
            <hr className="idpassfind_hr"/>
            <div className="idpassfind_text">변경할 비밀번호를 입력해 주세요.</div>
            <p>
                <input className="idpass_inputBox idpass_email" type="password" placeholder="비밀번호"/>
            </p>
            <p>
                <input className="idpass_inputBox idpass_email" type="password" placeholder="비밀번호 확인"/>
            </p>
            <p>
                <button className="Ok_btn">확인</button>
                <Link to="/member"><button className="back_btn">취소</button></Link>
            </p>
        </>
    )
}


export default PassCode;