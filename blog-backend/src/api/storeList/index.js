import Router from 'koa-router';
import * as storListCtrl from './storList.ctrl';

const storeList = new Router();

storeList.post('/register', storListCtrl);
storeList.post('/getlist', storListCtrl);


