import React, { useReducer } from 'react';
import { Link } from "react-router-dom"
import './CSS/Register.scss';

function reducer(state, action) {
    if (action.type === "ERROR") {
        return { ...state, error: "입력칸을 모두 입력해 주세요." }
    } else if (action.type === "NOERROR") {
        return { ...state, error: "" }
    }
    return {
        ...state,
        [action.name]: action.value
    };
}


function Register() {

    const [state, dispatch] = useReducer(reducer, {
        userid: '',
        username: '',
        password: '',
        email: '',
        passwordConfirm: '',
        error: ''
    });

    const { userid, username, password, email, passwordConfirm, error } = state;


    const onChange = e => {
        dispatch(e.target);
    };


    const onSubmit = (event) => {


        console.log(error);
        event.preventDefault();
        if ([userid, username, password, email, passwordConfirm].includes("")) {
            dispatch({ type: "ERROR" });
            return;
        } else {
            dispatch({ type: "NOERROR" });
            return;
        }
    };



    return (
        <>
            <div className="registBox">
                <div className="regist_logo">회원가입</div>
                <hr className="regist_hr" />
                <form onSubmit={onSubmit} >
                    <p><input className="regist_inputBox regist_name" name="username" type="text" placeholder="이름" value={username} onChange={onChange} autoComplete="off"></input></p>
                    <p><input className="regist_inputBox regist_id" name="userid" type="text" placeholder="아이디" value={userid} onChange={onChange} autoComplete="off"></input></p>
                    <p>
                        <input className="regist_inputBox regist_email" name="email" type="email" placeholder="이메일" value={email} onChange={onChange} autoComplete="off"></input>
                        <button className="codeBtn regist_email_codeSend mt-1" >코드전송</button>
                    </p>
                    <p>
                        <input className="regist_email_code ml-2" type="text" placeholder="인증 코드" autoComplete="off"></input>
                        <button className="codeBtn regist_email_codeOk">확인</button>
                    </p>
                    <p><input className="regist_inputBox regist_pass" name="password" type="password" placeholder="비밀번호" value={password} onChange={onChange} autoComplete="off"></input></p>
                    <p><input className="regist_inputBox regist_pass" name="passwordConfirm" type="password" placeholder="비밀번호 확인" value={passwordConfirm} onChange={onChange} autoComplete="off"></input></p>
                    <p className="errortext">{error}</p>
                    <p>
                        <button className="regist_btn">회원가입</button>
                        <Link to="/"><button className="regist_back">돌아가기</button></Link>
                    </p>
                </form>
            </div>
        </>
    )
}


export default Register;