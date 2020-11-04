import React, { useEffect, useReducer } from 'react';
import { Link } from "react-router-dom"
import './CSS/Register.scss';
import * as authAPI from "./auth";

function reducer(state, action) {

    switch (action.type) {
        case "ERROR":
            return { ...state, error: "입력칸을 모두 입력해 주세요.", errortext: false };
        case "EMAILERROR":
            return { ...state, error: "이메일을 입력해 주세요.", errortext: false }
        case "CODESEND":
            return { ...state, error: "코드가 전송되었습니다.", errortext: true }
        case "IDERROR_OVERRLAP":
            return { ...state, error: "이미 가입된 아이디 입니다.", errortext: false }
        case "EMAILERROR_OVERRLAP":
                return { ...state, error: "이미 가입된 이메일 입니다.", errortext: false }     
        case "NOERROR":
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
        error: '',
        errortext: false,
        code: ''
    });

    const { userid, username, password, email, passwordConfirm, error, errortext, code } = state;


    const onChange = e => {
        dispatch(e.target);
    };


    const onSubmit = async (event) => {


        //console.log(authAPI.register);
        event.preventDefault();
        if ([userid, username, password, email, passwordConfirm].includes("")) {
            dispatch({ type: "ERROR" });
            return;
        } else {
            const formData = {
                userid,
                username,
                password,
                email
            }
            // const error1 = authAPI.register(formData);
            // console.log(error);
            try {
                const result = await authAPI.register(formData);
                //console.log(error2);
            } catch (e) {
                const resulterror = e.response.status;
                console.log(resulterror)

                switch(resulterror){
                    case 409: 
                        return dispatch({ type: "IDERROR_OVERRLAP" });
                    case 410: 
                        return dispatch({ type: "EMAILERROR_OVERRLAP" });
                }
                
            }
            dispatch({ type: "NOERROR" });
            return;
        }
    };

    const codeSend = async (e) => {
        e.preventDefault();

        if ([email].includes("")) {
            dispatch({ type: "EMAILERROR" });
            return;
        } else {
            const formData = {
                email
            }
            try {
                const result = await authAPI.code(formData);
                
                console.log(result.data.code);
                
                const servercode = result.data.code;


            } catch (e) {
                console.log(e);       

            //     switch(e.data.message){
            //         case true: 
            //             return dispatch({ type: "EMAILERROR_OVERRLAP" });
            //    }
                
            }
            dispatch({ type: "NOERROR" });
            return;
        }

    }



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
                        <button className="codeBtn regist_email_codeSend mt-1"  onClick={codeSend}>코드전송</button>
                    </p>
                    <p>
                        <input className="regist_email_code ml-2" name="code" type="text" placeholder="인증 코드" value={code} onChange={onChange} autoComplete="off"></input>
                        <button className="codeBtn regist_email_codeOk">확인</button>
                    </p>
                    <p><input className="regist_inputBox regist_pass" name="password" type="password" placeholder="비밀번호" value={password} onChange={onChange} autoComplete="off"></input></p>
                    <p><input className="regist_inputBox regist_pass" name="passwordConfirm" type="password" placeholder="비밀번호 확인" value={passwordConfirm} onChange={onChange} autoComplete="off"></input></p>

                    {errortext ? <p className="text-white">{error}</p> : <p className="text-warning">{error}</p>}
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