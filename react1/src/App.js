import React from 'react';
import { Route } from 'react-router-dom';
import Member from './Member/Member';
import { Link } from "react-router-dom"
import styled from 'styled-components';
import Store from './Store';
import AdPage from './AdTable/AdminPage/';
import StoreList from './List/App';
import StoreInvoice from './List/Invoice';


const BackBtn = styled.div`
    position: absolute;
    color: #fff;
    background-color: black;
    text-decoration: none;
    right: 10px;
    top: 10px;
    width: 80px;
    height: 25px;
    text-align: center;
    border-radius: 20px;
    z-index:1;
`
;

function App() {
  return (
    <>
        <Route path="/" exact={true} component={Member}/>
        <Route path="/member" component={Member}/>
        <Route path="/store" component={Store}/>
        <Route path="/adlogin" component={AdPage}/>
        <Route path="/userlist" component={AdPage}/>
        <Route path="/storelist" component={StoreList}/>
        <Route path="/storeadd" component={StoreList}/>
        <Route path="/storeinvoice" component={StoreInvoice}/>
    </>
  );
}

export default App;
