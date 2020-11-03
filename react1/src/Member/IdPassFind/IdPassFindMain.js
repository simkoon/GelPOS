import React from 'react';
import { Link } from "react-router-dom"
import './CSS/IdPassFind.scss';

function IdPassFind(){
    return (
        <>
            <div className="idpassfind_logo">아이디.비밀번호 찾기</div>
            <hr className="idpassfind_hr"/>
            <p>
                <Link to="/member/idpassfind/idfind"><button className="idpassfind_btn">아이디찾기</button></Link>
                <Link to="/member/idpassfind/passcode"><button className="idpassfind_btn">비밀번호 변경</button></Link>
            </p>
            <p>
                <Link to="/"><button className="idpassfind_back">돌아가기</button></Link>
            </p>
        </>
    )
}


export default IdPassFind;