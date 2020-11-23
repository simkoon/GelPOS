import Router from 'koa-router';
import * as menuCtrl from './menu.ctrl';

const menus = new Router();

menus.post('/categoryAdd', menuCtrl.addCategory);

menus.get('/:storeid', menuCtrl.menuList);

menus.post('/categoryDel', menuCtrl.categoryDel);

menus.post('/categoryUpdate', menuCtrl.categoryUpdate);

export default menus;
