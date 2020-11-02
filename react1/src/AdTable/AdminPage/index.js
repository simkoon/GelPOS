import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Adlogin from './components/Adlogin';
import 'bootstrap/dist/css/bootstrap.css';
import UserList from './UserList';
import StoreList from './StoreList';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <>
        <Switch>
            <Route path="/adlogin" exact={true} component={Adlogin}/>
            <Route path="/userlist" component={UserList} />
            <Route path="/adstorelist" component={StoreList} />
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
