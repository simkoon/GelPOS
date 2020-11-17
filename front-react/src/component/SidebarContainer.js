import { Route } from "react-router-dom";
import Sidebar from "../comm/Sidebar/Tsidebar";
import Scheduler from "./Scheduler";
import StoreAdd from "./StoreAdd/StoreAddContainer";
import Invoice from "./Invoice/Invoice";
<<<<<<< HEAD
import Table from "./Table";
import StoreInfo from "./StoreInfo";
=======
import Table from "./Table/TableContainer";
>>>>>>> 99aeb1791479f573b91a2cb776054a8c7b71e07d

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
