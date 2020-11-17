import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/code', authCtrl.code);
auth.post('/login', authCtrl.login);
auth.post('/check', authCtrl.check);
auth.post('/logout', authCtrl.logout);
auth.post('/findCode', authCtrl.findCode);
auth.post('/pwChange', authCtrl.pwChange);

export default auth;
