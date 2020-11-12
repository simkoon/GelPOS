<<<<<<< HEAD
import { Route } from 'react-router-dom';
import Member from './component/Member';
import StoreList from './component/StoreList/StoreListContainer';
import Scheduler from './component/Scheduler';
import StoreAdd from './component/StoreAdd/StoreAddContainer';
import Invoice from './component/Invoice/Invoice';
import SidebarContainer from './component/SidebarContainer'

function App() {
  return (
    <>
      <Route path="/" exact={true} component={Member} />
      <Route path="/member" component={Member} />
      <Route path="/storeList" exact={true} component={StoreList} />
      <Route path="/store" component={SidebarContainer} />
   
=======
import { Route, Switch } from "react-router-dom";
import Member from "./component/Member";
import StoreList from "./component/StoreList/StoreListContainer";
import Scheduler from "./component/Scheduler";
import StoreAdd from "./component/StoreAdd/StoreAddContainer";
import AddMenu from "./component/AddMenu/Addmenu";
function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact={true} component={Member} />
        <Route path="/member" component={Member} />
        <Route path="/storeList" component={StoreList} />
        <Route path="/scheduler" component={Scheduler} />
        <Route path="/storeAdd" component={StoreAdd} />
        <Route path="/addmenu" component={AddMenu}/>
      </Switch>
>>>>>>> cf3454c126836f35992a84667beb84e6449154a7
    </>
  );
}
/*
라우트 순서
  멤버 로그인
  스토어리스트
  스토어추가
  ...
comm 폴더에 
  sidebar, header등등
*/
export default App;
