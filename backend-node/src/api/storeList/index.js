import Router from 'koa-router';
import * as storListCtrl from './storList.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
const storeList = new Router();

storeList.post('/register', checkLoggedIn, storListCtrl.register);
storeList.get('/reToken', checkLoggedIn, storListCtrl.reToken);
storeList.post('/selectStore', checkLoggedIn, storListCtrl.selectStore);

export default storeList;
