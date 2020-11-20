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

import Table from './models/table';
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';
import { create } from 'domain';

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

      // if (!ctx.state.user) {
      //   console.log(ctx);
      //   ctx.status = 401; // Unauthorized
      //   console.log('여기들옴');
      //   return;
      // }
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
    console.log(socket);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // 가게 고유번호로 룸을 만들고 그안에서 해결
    if (app.io.sockets.adapter.rooms.has(decoded.nowstore)) {
      console.log('이미방잇음');
    } else {
      console.log('방을 새로만듬');
      const createRoomId = decoded.nowstore;
      socket.join(createRoomId);
      console.log(app.io.sockets.adapter.rooms.has(decoded.nowstore));
    }

    socket.on('getTables', async function (msg) {
      console.log('getTables 이벤트 ');
      console.log(msg);
      const tables = await Table.findByStoreId(decoded.nowstore);
      // app.io.to().emit('getTables');
      socket.emit('getTables', tables);
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
// import Table from './models/table';
app.listen(port, () => {
  console.log('Listening to port %d', port);

  // (async () => {
  //   const invoice = new Table({
  //     storeId: '5fb689206615240a4409435e',
  //     table: [
  //       {
  //         name: '홀 테이블1',
  //         startAt: Date(2020, 11, 11, 13, 20, 12),
  //         nowMenu: [
  //           {
  //             name: '짜장',
  //             price: '3000',
  //             EA: 3,
  //             priceSum: '9000',
  //           },
  //         ],
  //       },
  //       {
  //         name: '홀 테이블2',
  //         startAt: Date(2020, 11, 11, 13, 20, 12),
  //         nowMenu: [
  //           {
  //             name: '짬뽕',
  //             price: '5000',
  //             EA: 4,
  //             priceSum: '20000',
  //           },
  //           {
  //             name: '탕슉',
  //             price: '15000',
  //             EA: 1,
  //             priceSum: '15000',
  //           },
  //         ],
  //       },
  //     ],
  //     menu: [
  //       {
  //         name: '짬뽕',
  //         price: '5000',
  //         category: '면류',
  //       },
  //       {
  //         name: '탕슉',
  //         price: '15000',
  //         category: '요리류',
  //       },
  //       {
  //         name: '짜장',
  //         price: '3000',
  //         category: '면류',
  //       },
  //     ],
  //   });
  //   const result = await invoice.save();
  //   console.log(result);
  // })();
});
