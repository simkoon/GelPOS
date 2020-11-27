import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Adlogin from './components/Adlogin';
import 'bootstrap/dist/css/bootstrap.css';
import UserList from './UserList';
import AwaitList from './AwaitList';
import StoreList from './Storelist';

function App() {
  return (
    <>
        <Switch>
            <Route path="/" exact={true} component={Adlogin}/>
            <Route path="/userList" component={UserList} />
            <Route path="/awaitlist" component={AwaitList}/>
            <Route path="/adminstorelist" component={StoreList}/>
            <Route
            render={({ location }) => (
              <div>
                <h2>이 페이지는 존재하지 않습니다:</h2>  
                <p>{location.pathname}</p>
              </div>
            )}
            /> 
        </Switch>
    </>
  );
}

export default App;
