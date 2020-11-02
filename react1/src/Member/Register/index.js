import React from 'react';
import { Link } from "react-router-dom"
import './CSS/Register.scss';

function Register(){

    return (
        <>
            <div className="registBox">
                    <div className="regist_logo">회원가입</div>
                    <hr className="regist_hr"/>
                    <form >
                        <p><input className="regist_inputBox regist_name" name="username" type="text" placeholder="이름"></input></p>
                        <p><input className="regist_inputBox regist_id" name="userid" type="text" placeholder="아이디"></input></p>
                        <p>
                            <input className="regist_inputBox regist_email" name="email" type="email" placeholder="이메일"></input>
                            <button className="codeBtn regist_email_codeSend">코드전송</button>
                        </p>
                        <p>
                            <input className="regist_email_code" type="text" placeholder="인증 코드"></input>
                            <button className="codeBtn regist_email_codeOk">확인</button>
                        </p>
                        <p><input className="regist_inputBox regist_pass" name="password1" type="password" placeholder="비밀번호"></input></p>
                        <p><input className="regist_inputBox regist_pass" name="password2" type="password" placeholder="비밀번호 확인"></input></p>
                        <p>
                            <button className="regist_btn">회원가입</button>
                            <Link to="/member"><button className="regist_back">돌아가기</button></Link>
                        </p>
                    </form>
                </div>
        </>
    )
}


export default Register;