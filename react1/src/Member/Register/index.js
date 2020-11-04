import React, { useEffect, useReducer, useState } from 'react';
import { Link } from "react-router-dom"
import './CSS/Register.scss';
import * as authAPI from "./auth";

function reducer(state, action) {

    switch (action.type) {
        case "ERROR":
            return { ...state, error: "입력칸을 모두 입력해 주세요.", errortext: false };
        case "EMAILERROR":
            return { ...state, error: "이메일을 입력해 주세요.", errortext: false }
        case "IDERROR_OVERRLAP":
            return { ...state, error: "이미 존재하는 아이디 입니다.", errortext: false }
        case "EMAILERROR_OVERRLAP":
            return { ...state, error: "이미 존재하는 이메일 입니다.", errortext: false }     
        case "CODESEND":
            return { ...state, error: "코드가 전송되었습니다.", errortext: true, codesend: true }
        case "CODE_OK":
            return { ...state, error: "코드 인증을 성공하였습니다.", errortext: true, codeconfirm: true }
        case "CODE_NO":
            return { ...state, error: "코드 번호가 일치하지 않습니다.", errortext: false }

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
        code: '',
        codesend: false,
        codeconfirm: false
    });

    const [value, setValue] = useState("");

    const { 
        userid, username, password, email, passwordConfirm, error, errortext, code, codesend, codeconfirm 
    } = state;


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

        const emailRegExp = "/^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/";

        if ([email].includes("")) {
            dispatch({ type: "EMAILERROR" });
            return;
        } else {
            if(email === emailRegExp){
                dispatch({ type: "EMAILERROR" });
                return;
            }
            const formData = {
                email
            }
            try {
                const result = await authAPI.code(formData);
                
                console.log(result.data.code);
                
                const servercode = result.data.code;

                setValue(servercode);
                
                dispatch({ type: "CODESEND" });

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

    const codeCheck = async (e) => {
        e.preventDefault();

        console.log("value",value);
        if(code !== ""){
            if(code === value){
                console.log("성공");
                dispatch({ type: "CODE_OK" });
                return
            }else{
                console.log("실패");
                dispatch({ type: "CODE_NO" });
                return
            }
        }

    
    }



    return (
        <>
            <div className="registBox">
                <div className="regist_logo">회원가입</div>
                <hr className="regist_hr" />
                <form onSubmit={onSubmit} >
                    <p className="inputTextBox">
                        <div className="inputname">이름</div>
                        <input className="regist_inputBox regist_name" 
                            name="username" 
                            type="text"  
                            value={username} 
                            onChange={onChange} 
                            autoComplete="off" 
                            required
                        />
                    </p>
                    <p className="inputTextBox">
                        <div className="inputname">아이디</div>
                        <input className="regist_inputBox regist_id" 
                            name="userid" 
                            type="text"  
                            value={userid} 
                            onChange={onChange} 
                            autoComplete="off" 
                            minLength="4" 
                            maxLength="12" 
                            required
                        />
                    </p>
                    <p className="inputTextBox">
                    <div className="inputname">이메일</div>
                    {codesend ? <input className="regist_inputBox regist_email readonlyInput" 
                                    name="email" 
                                    type="email" 
                                    value={email} 
                                    onChange={onChange} 
                                    autoComplete="off" 
                                    maxLength="24" 
                                    readOnly
                                /> 
                    :
                        <input className="regist_inputBox regist_email" 
                            name="email" 
                            type="email" 
                            value={email} onChange={onChange} 
                            autoComplete="off" maxLength="24" required
                        />}
                        {codesend ? 
                        <button className="codeBtn regist_email_codeSend mt-1"  
                            onClick={codeSend}>
                            다시전송
                        </button> 
                        : 
                        <button className="codeBtn regist_email_codeSend mt-1" 
                            onClick={codeSend}>
                            코드전송
                        </button>}
                    </p>
                    <p className="inputTextBox">
                        <div className="inputname">인증코드</div>
                        {codeconfirm ?
                        <input className="regist_email_code ml-2 readonlyInput" 
                            name="code" 
                            type="text" 
                            value={code} 
                            onChange={onChange} 
                            autoComplete="off" 
                            maxLength="5" required
                        />
                        :
                        <input className="regist_email_code ml-2" 
                            name="code" 
                            type="text" 
                            value={code} 
                            onChange={onChange} 
                            autoComplete="off" 
                            maxLength="5" required
                        />}
                        {codeconfirm ?
                        <button className="codeBtn regist_email_codeOk" 
                        onClick={codeCheck}>
                        확인
                        </button>
                        :
                        <button className="codeBtn regist_email_codeOk" 
                            onClick={codeCheck}>
                            확인
                        </button>}
                    </p>
                    <p className="inputTextBox">
                        <div className="inputname">비밀번호</div>
                        <input className="regist_inputBox regist_pass" 
                            name="password" 
                            type="password" 
                            value={password} 
                            onChange={onChange} 
                            autoComplete="off" 
                            minLength="4" 
                            maxLength="12" 
                            required
                        />
                        </p>
                    <p className="inputTextBox">
                        <div className="inputname">비밀번호 확인</div>
                        <input className="regist_inputBox regist_pass" 
                            name="passwordConfirm" 
                            type="password" 
                            value={passwordConfirm} 
                            onChange={onChange} 
                            autoComplete="off" 
                            minLength="4" 
                            maxLength="12" 
                            required
                        />
                    </p>

                    {errortext ? 
                        <p className="text-white">
                            {error}
                        </p> 
                        : 
                        <p className="text-warning">
                            {error}
                        </p>}
                    <p>
                        <button className="regist_btn">
                            회원가입
                        </button>
                        <Link to="/">
                            <button className="regist_back">
                                돌아가기
                            </button>
                        </Link>
                    </p>
                </form>
            </div>
        </>
    )
}


export default Register;