import { Route } from "react-router-dom";
import Sidebar from "../comm/Sidebar/Tsidebar";
import Scheduler from "./Scheduler";
import StoreAdd from "./StoreAdd/StoreAddContainer";
import Invoice from "./Invoice/Invoice";
import StoreInfo from "./StoreInfo";
import Table from "./Table/TableContainer";

export default function SidebarContainer(params) {
  return (
    <>
      <Sidebar>
        <Route path="/store/scheduler" component={Scheduler} />
        <Route path="/store/storeAdd" component={StoreAdd} />
        <Route path="/store/invoice" component={Invoice} />
        <Route path="/store/table" component={Table} />
        <Route path="/store/storeinfo" component={StoreInfo} />
      </Sidebar>
    </>
  );
}
