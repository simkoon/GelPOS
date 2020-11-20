import Router from 'koa-router';
import * as menuCtrl from './menu.ctrl';

const menus = new Router();

menus.post('/', menuCtrl.addMenu);
// menus.post('/addcategory', menuCtrl.addCategory);

menus.get('/:storeid', menuCtrl.menuList);

export default menus;
