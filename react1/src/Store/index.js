import React,{useState, useEffect} from 'react';
import { Link, Route } from "react-router-dom";
import Sidebar from "react-sidebar";
import Tsidebar from "./Sidebar/Tsidebar";
import Ttables from './Sidebar/Tsidebar';
import List from '../List/App';
import StoreInfo from './StoreInfo';
//import classNames from 'classnames';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './CSS/Login.scss';

function Store(){
    return (
        <>
            <Route path="/store/table">
                <Tsidebar/>
                <Ttables/>
            </Route>
            <Route path="/store/list" exact={true} component={List}/>
            <Route path="/store/storeinfo">
                <Tsidebar>
                    <StoreInfo/>
                </Tsidebar>
            </Route>
        </>
    )
}


export default Store;