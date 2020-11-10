import Router from 'koa-router';
import * as storListCtrl from './storList.ctrl';

const storeList = new Router();

storeList.post('/register', storListCtrl.register);
storeList.get('/reToken', storListCtrl.reToken);

export default storeList;
