import Schedule from '../../models/schedule';
import Joi from 'joi';
import User from '../../models/user';
import Table from '../../models/table';
import jwt from 'jsonwebtoken';

// async () => {
//   const user = await User.findByUserid('test1');
//   user.store.push({ name: 'hi' });
//   let store = user.store;
//   console.log(store);
// };

const validateStore = (user, nowstore) => {
  let result = false;

  user.store.forEach((store) => {
    console.log(store._id);
    console.log(nowstore);
    if (store._id == nowstore) {
      result = true;
    }
  });
  return result;
};

export const selectStore = async (ctx) => {
  let token = ctx.cookies.get('access_token');
  if (!token) {
    ctx.create = 401;
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      ctx.status = 401;
      return;
    }
    const { nowstore } = ctx.request.body;
    console.log('리퀘스트 나우스토오');
    console.log(nowstore);
    if (!validateStore(user, nowstore)) {
      ctx.status = 401;
      return;
    }
    ctx.state.user.nowstore = nowstore;
    console.log('유저저');
    console.log(ctx.state.user);
    ctx.body = ctx.state.user;
    token = user.generateToken(nowstore);
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const reToken = async (ctx) => {
  let token = ctx.cookies.get('access_token');
  if (!token) {
    ctx.status = 401;
    return;
  } // 토큰이 없음
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      ctx.status = 401;
      return;
    }
    ctx.state.user = {
      _id: user._id,
      userid: user.userid,
      username: user.username,
      email: user.email,
      store: user.store,
      nowstore: '',
    };

    ctx.body = ctx.state.user;
    token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const register = async (ctx) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    regNumber: Joi.string().required(),
    address: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    console.log(result);
    return;
  }

  const { name, regNumber, address } = ctx.request.body;
  console.log(name, regNumber, address);
  // const userObjectId = ctx.state.user._id;
  //이거 수정해서 테스트해야함
  const userObjectId = ctx.state.user._id;
  const user = await User.findById(userObjectId);
  const newStore = user.store.create({
    name,
    regNumber,
    address,
  });
  console.log(newStore._id); // store의 아이디
  user.store.push(newStore);

  try {
    await user.save();

    const storeid = newStore._id;
    // 스케줄 생성
    const schedule = new Schedule({
      storeid: storeid,
      Schedulelist: [{}],
    });

    await schedule.save();

    // 테이블 생성
    const table = new Table({
      storeId: storeid,
      table: [
        {
          name: '기본 테이블1',
          startAt: '',
          nowMenu: [],
          done: false,
        },
        {
          name: '기본 테이블2',
          startAt: '',
          nowMenu: [],
          done: false,
        },
        {
          name: '기본 테이블3',
          startAt: '',
          nowMenu: [],
          done: false,
        },
        {
          name: '기본 테이블4',
          startAt: '',
          nowMenu: [],
          done: false,
        },
        {
          name: '기본 테이블5',
          startAt: '',
          nowMenu: [],
          done: false,
        },
        {
          name: '기본 테이블6',
          startAt: '',
          nowMenu: [],
          done: false,
        },
        {
          name: '기본 테이블7',
          startAt: '',
          nowMenu: [],
          done: false,
        },
        {
          name: '기본 테이블8',
          startAt: Date(2020, 11, 11, 13, 20, 12),
          nowMenu: [
            {
              name: '짬뽕',
              price: '5000',
              EA: 4,
              priceSum: '20000',
            },
            {
              name: '탕슉',
              price: '15000',
              EA: 1,
              priceSum: '15000',
            },
          ],
          done: false,
        },
      ],
      category: [
        {
          name: '면류',
          menu: [
            {
              name: '짬뽕',
              price: '5000',
            },
            {
              name: '짜장면',
              price: '4000',
            },
          ],
        },
        {
          name: '식사류',
          menu: [
            {
              name: '볶음밥',
              price: '6000',
            },
            {
              name: '짬뽕밥',
              price: '3000',
            },
            {
              name: '마파두부밥',
              price: '9000',
            },
          ],
        },
        {
          name: '요리류',
          menu: [
            { name: '탕수육', price: '12000' },
            {
              name: '난자완스',
              price: '23000',
            },
            { name: '깐풍기', price: '21000' },
          ],
        },
      ],
    });

    const resultTable = await table.save();

    ctx.body = user;
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (error) {
    ctx.throw(500, error);
  }
};
