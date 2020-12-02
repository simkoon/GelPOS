import Router from 'koa-router';
import * as schedulesCtrl from './schedules.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const schedules = new Router();

schedules.get('/:storeid', schedulesCtrl.list);

// checkLoggedIn,
schedules.post('/', schedulesCtrl.write);

// const schedule = new Router(); // /api/posts/:id
// schedule.get('/', schedulesCtrl.read);
schedules.delete('/:id', schedulesCtrl.remove);
//  checkLoggedIn,

schedules.post('/update', schedulesCtrl.update);

//  checkLoggedIn,
//  schedulesCtrl.checkOwnschedule,

// schedules.use('/:id', schedulesCtrl.getscheduleById, schedule.routes());

export default schedules;
