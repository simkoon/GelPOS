require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import http from 'http';
import socketIO from 'socket.io';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

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
const socketTable = new Router();

// Socket.io app 인스턴스 생성
app.server = http.createServer(app.callback());
app.io = socketIO(app.server, {});

app.io
  .use((socket, next) => {
    let error = null;
    try {
      let ctx = app.createContext(socket.request, new http.OutgoingMessage());
      socket.cookies = ctx.cookies;
      if (!ctx.state.user) {
        ctx.status = 401; // Unauthorized
        return;
      }
    } catch (err) {
      error = err;
      console.log(error);
    }
    return next(error);
  })
  .on('connection', function (socket) {
    console.log('connected');
    const token = socket.cookies.get('access_token');
    if (!token) return; // 토큰이 없음
    console.log('connected2');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    socket.on('joinRoom', function (join) {
      console.log(join);
    });
    socket.on('chat', function (msg) {
      console.log(msg);
      app.io.emit('chat', msg + '222222');
    });
  });

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용
router.use('/', socketTable.routes());
// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// 소켓 적용, app.listen 오버라이드

app.listen = (...args) => {
  app.server.listen.call(app.server, ...args);
  return app.server;
};

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

  (async () => {
    // const invoice = new Invoice({
    //   storeId: '5fae06c4496fa717157afa44',
    //   seq: 6,
    //   menu: ['다금바리무침', '짜장'],
    //   paymentOption: '카카오페이',
    //   payment: '460000',
    //   user: {
    //     _id: '5fab4ce09a24713f1dd19ae9',
    //     userid: 'root1',
    //     email: '213',
    //     username: '조옥상',
    //   },
    // });
    // const result = await invoice.save();
    // console.log(result);
  })();
});
