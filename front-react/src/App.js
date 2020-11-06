import { Route } from "react-router-dom";
import Member from "./componet/Member";

function App() {
  return (
    <>
      <Route path="/" exact={true} component={Member} />
      <Route path="/member" component={Member} />
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
