require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import http from 'http';
import socketIO from 'socket.io';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

import User from './models/user';

// 비구조화 할당을 통하여 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// 소켓 적용, app.listen 오버라이드
app.server = http.createServer(app.callback());
app.listen = (...args) => {
  app.server.listen.call(app.server, ...args);
  return app.server;
};

// Socket.io app 인스턴스 생성
app.io = socketIO(app.server, {});

app.io.on('connection', function (socket) {
  console.log('connected');
  socket.on('chat', function (msg) {
    console.log(msg);
    app.io.emit('chat', msg + '222222');
  });
});

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
// app.use(serve(buildDirectory));
// app.use(async ctx => {
//   // Not Found 이고, 주소가 /api 로 시작하지 않는 경우
//   if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
//     // index.html 내용을 반환
//     await send(ctx, 'index.html', { root: buildDirectory });
//   }
// });

// PORT 가 지정되어있지 않다면 4000 을 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
  // (async () => {
  //   const user = await User.findByUserid('test1');
  //   console.log(user);
  //   console.log(user.store);
  //   let newstore = user.store.create({ name: '옥상이네족발집5' });
  //   console.log("-------------------------");
  //   console.log(newstore._id);
  //   let id = user.store.push(newstore);
  //   console.log(id);
  //   console.log(user.store);
  //   await user.save();
  // })();
});
