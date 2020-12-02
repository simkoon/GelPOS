import Router from 'koa-router';
import * as tableCtrl from './table.ctrl';

const tables = new Router();

tables.post('/tableAdd', tableCtrl.addTable);

tables.get('/:storeid', tableCtrl.tableList);

tables.post('/tableDel', tableCtrl.tableDel);

tables.post('/tableUpdate', tableCtrl.tableUpdate);

// menus.post('/categoryAdd', menuCtrl.addCategory);

// menus.get('/:storeid', menuCtrl.categoryList);

// menus.post('/categoryDel', menuCtrl.categoryDel);

// menus.post('/menuAdd', menuCtrl.menuAdd);

// menus.post('/menuUpdate', menuCtrl.menuUpdate);

export default tables;
