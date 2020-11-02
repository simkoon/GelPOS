import React from 'react';
import { Link } from "react-router-dom"
//import classNames from 'classnames';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Login.scss';

function Login(){
    return (
        <>
            <div className="loginBox">
                <div className="login_logo"/>
                <hr className="log_hr"/>
                <form >
                    <p><input className="login_id" type="text" placeholder="아이디"></input></p>
                    <p><input className="login_pass" type="password" placeholder="비밀번호"></input></p>
                    <p><button className="login_btn">Login</button></p>
                    <p><Link to="/member/register"><span className="login_joinBtn">회원 가입</span></Link></p>
                    <p><Link to="/member/idpassfind/idpassfindmain"><span className="login_find">아이디 비밀번호 찾기</span></Link></p>
                </form>
            </div>
        </>
    )
}


export default Login;