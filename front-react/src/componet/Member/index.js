import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import IdPassFindMian from './IdPassFind/IdPassFindMain';
import MemberContainer from "./container/MemberContainer";
import IdPassFindBox from './IdPassFind/IdPassFindBox';
import IdFind from './IdPassFind/IdFind';
import PassCode from './IdPassFind/PassCode';
import PassChange from './IdPassFind/PassChange';
//import SiteMap from './SiteMap';

function Member() {
    return (
    <>
        <MemberContainer>
        
        <Route path="/" exact={true} component={Login}/>
        <Route path="/member/register" component={Register}/>
            <Route path="/member/idpassfind">
                <IdPassFindBox>
                    <Route path="/member/idpassfind/idpassfindmain" component={IdPassFindMian}/>
                    <Route path="/member/idpassfind/idfind" component={IdFind}/>
                    <Route path="/member/idpassfind/passcode" component={PassCode}/>
                    <Route path="/member/idpassfind/passchange" component={PassChange}/>
                </IdPassFindBox>
            </Route>
        </MemberContainer>
    </>
    );
}

export default Member;
