import { Route } from 'react-router-dom';
import Sidebar from '../comm/Sidebar/Tsidebar';
import Scheduler from './Scheduler';
import StoreAdd from './StoreAdd/StoreAddContainer';
import Invoice from './Invoice/Invoice';
import StoreInfo from './StoreInfo';
import Table from './Table/TableContainer';
import TableDetail from './Table/TableDetail';

import SocketProvider from './context/socket';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { check } from '../modules/user';
export default function SidebarContainer({ history }) {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  useEffect(() => {
    dispatch(check());
  }, [dispatch]);
  useEffect(() => {
    if (user === null || user === 'null') {
      history.push('/');
    }
  });
  useEffect(() => {
    if (user) {
      if (user.nowstore === '') {
        alert('잘못된 접근입니다.');
        history.push('/');
      }
    }
  });
  return (
    <SocketProvider>
      <Sidebar>
        <Route path="/store/scheduler" component={Scheduler} />
        <Route path="/store/storeAdd" component={StoreAdd} />
        <Route path="/store/invoice" component={Invoice} />
        <Route path="/store" exact component={Table} />
        <Route path="/store/table" component={Table} />
        <Route path="/store/storeinfo" component={StoreInfo} />
        <Route path="/store/tableDetail/:seq" component={TableDetail} />
      </Sidebar>
    </SocketProvider>
  );
}
