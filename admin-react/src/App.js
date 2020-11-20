import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Adlogin from './components/Adlogin';
import 'bootstrap/dist/css/bootstrap.css';
import UserList from './UserList';

function App() {
  return (
    <>
        <Switch>
            <Route path="/admin" exact={true} component={Adlogin}/>
            <Route path="/userList" component={UserList} />
            <Route
            render={({ location }) => (
              <div>
                <h2>이 페이지는 존재하지 않습니다:</h2>  
                <p>{location.pathname}</p>
                <p>*** /admin이 로그인화면 ***</p>
              </div>
            )}
            /> 
        </Switch>
    </>
  );
}

export default App;
