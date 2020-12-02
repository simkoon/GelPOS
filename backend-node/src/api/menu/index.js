import Router from 'koa-router';
import * as menuCtrl from './menu.ctrl';

const menus = new Router();

menus.post('/categoryAdd', menuCtrl.addCategory);

menus.get('/:storeid', menuCtrl.categoryList);

menus.post('/categoryDel', menuCtrl.categoryDel);

menus.post('/categoryUpdate', menuCtrl.categoryUpdate);

menus.post('/menuAdd', menuCtrl.menuAdd);

menus.post('/menuDel', menuCtrl.menuDel);

menus.post('/menuUpdate', menuCtrl.menuUpdate);

export default menus;
