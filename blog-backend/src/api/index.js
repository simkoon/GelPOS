import Router from 'koa-router';
import posts from './posts';
import schedule from './schedule';
import auth from './auth';
import storeList from './storeList';
import menus from './menu';
import invoice from './invoice';
import userList from './userlist';
import tables from './table';
const api = new Router();

//api.use('/posts', posts.routes());
api.use('/schedule', schedule.routes());
api.use('/auth', auth.routes());
api.use('/storeList', storeList.routes());
api.use('/menu', menus.routes());
api.use('/invoice', invoice.routes());
<<<<<<< HEAD
api.use('/UserList', userList.routes());
=======
api.use('/userList', userList.routes());
api.use('/table', tables.routes());
>>>>>>> ecdd2b2c2e16850bd6752af50e28676d3818740c
// 라우터를 내보냅니다.
export default api;
