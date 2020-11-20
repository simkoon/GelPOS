import Router from 'koa-router';
import posts from './posts';
import schedule from './schedule';
import auth from './auth';
import storeList from './storeList';
import menus from './menu';
import invoice from './invoice';
import userList from './userlist';
const api = new Router();

//api.use('/posts', posts.routes());
api.use('/schedule', schedule.routes());
api.use('/auth', auth.routes());
api.use('/storeList', storeList.routes());
api.use('/menu', menus.routes());
api.use('/invoice', invoice.routes());
api.use('/userList', userList.routes());
// 라우터를 내보냅니다.
export default api;
