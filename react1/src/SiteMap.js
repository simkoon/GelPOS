import React from 'react';
import { Link } from "react-router-dom"
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
//import ImageView from './sitemap1/ImageView';

// const Container = styled.div`
// box-sizing: border-box;
// height: 100vh;
// width: 100%;
// background-image : url(${require('./sitemap/image/login.jpg')});
// background-repeat : no-repeat;
// background-size : 100% 100%;
// padding-top: 230px;`
// ;

const Title = styled.h1`
margin-top: 50px;
text-align: center;
margin-bottom: 50px;
`
;

const Container = styled.div`
    margin: 0 auto;
    width: 1000px;
`
;



function SiteMap(){
    return (
        <>
            <Title>GelPos SITEMAP</Title>
            <Container>
                
            <Link to="/member"><Button className="m-1 bg-success border-0 bg-success">로그인</Button></Link>
            <Link to="/member/register"><Button className="m-1 border-0 bg-success">회원가입</Button></Link>
            <Link to="/member/idpassfind/idpassfindmain"><Button className="m-1 border-0 bg-success">아이디찾기</Button></Link>
            <Link to="/member/idpassfind/passcode"><Button className="m-1 border-0 bg-success">비번변경</Button></Link>
            <Link to="/storelist"><Button className="m-1 border-0 bg-success">가게리스트</Button></Link>
            <Link to="/storeadd"><Button className="m-1 border-0 bg-success">가게추가</Button></Link>
            <Link to="/"><Button href="./sitemap/image/table.jpg" className="m-1 border-0 bg-secondary">테이블</Button></Link>
            <Link to="/"><Button href="./sitemap/image/schedule.jpg" className="m-1 border-0 bg-secondary">스케줄러</Button></Link>
            <Link to="/storeinvoice"><Button href="./sitemap/image/transaction.jpg" className="m-1 border-0 bg-success">거래내역</Button></Link>
            <Link to="/store/storeinfo"><Button className="m-1 box border-0 bg-success bg-secondary">가게정보</Button></Link>
            <Link to="/adlogin"><Button className="m-1 border-0 bg-success">관리자</Button></Link>
            <Link to="/userlist"><Button className="m-1 border-0 bg-success">가게리스트</Button></Link>
            <Link to="/"><Button href="/" className="m-1 border-0 bg-danger">승인대기</Button></Link>
            <Link to="/"><Button href="/" className="m-1 border-0 bg-danger">유저리스트</Button></Link>
            <Link to="/"><Button href="/" className="m-1 border-0 bg-danger">문의내역</Button></Link>
        </Container>
        <div>
            <div>
                <Button className="m-1 bg-success border-0 black "><span>퍼블리싱 완료 페이지</span></Button>
            </div>
            <div>
                <Button className="m-1 bg-secondary border-0"><span>디자인 완료 페이지</span></Button>
            </div>
                <Button className="m-1 bg-danger border-0" ><span>미완성 페이지</span></Button>
        </div>
        </>
    )
}


export default SiteMap;