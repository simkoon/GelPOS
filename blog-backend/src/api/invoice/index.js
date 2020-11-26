import Router from 'koa-router';
import * as invoiceCtrl from './invoice.ctrl';
const invoice = new Router();

invoice.post('/getList', invoiceCtrl.read);
invoice.post('/refund', invoiceCtrl.refund);
export default invoice;
