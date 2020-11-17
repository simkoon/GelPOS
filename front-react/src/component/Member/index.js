import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import IdPassFindMain from "./IdPassFind/IdPassFindMain";
import MemberContainer from "./container/MemberContainer";
import IdPassFindBox from "./IdPassFind/IdPassFindBox";

function Member() {
  return (
    <>
      <MemberContainer>
        <Route path="/" exact={true} component={Login} />
        <Route path="/member/register" component={Register} />
        <Route path="/member/idpassfind">
          <IdPassFindBox>
            <IdPassFindMain />
          </IdPassFindBox>
        </Route>
      </MemberContainer>
    </>
  );
}

export default Member;
