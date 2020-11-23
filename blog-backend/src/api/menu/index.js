import Router from 'koa-router';
import * as menuCtrl from './menu.ctrl';

const menus = new Router();

menus.post('/categoryAdd', menuCtrl.addCategory);
// menus.post('/addcategory', menuCtrl.addCategory);

menus.get('/:storeid', menuCtrl.menuList);

export default menus;
