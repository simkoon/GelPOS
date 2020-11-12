import Router from 'koa-router';
import posts from './posts';
import auth from './auth';
import storeList from './storeList';
import menus from './menu';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/storeList', storeList.routes());
api.use('/addmenu', menus.routes());

// 라우터를 내보냅니다.
export default api;
