import Router from 'koa-router';
import * as schedulesCtrl from './schedules.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';


const schedules = new Router();

schedules.get('/', schedulesCtrl.list);

// checkLoggedIn,
schedules.post('/', schedulesCtrl.write);


// const schedule = new Router(); // /api/posts/:id
// schedule.get('/', schedulesCtrl.read);
// schedule.delete(
//   '/',
//   checkLoggedIn,
//   schedulesCtrl.checkOwnschedule,
//   schedulesCtrl.remove,
// );
// schedule.patch(
//   '/',
//   checkLoggedIn,
//   schedulesCtrl.checkOwnschedule,
//   schedulesCtrl.update,
// );

// schedules.use('/:id', schedulesCtrl.getscheduleById, schedule.routes());

export default schedules;
