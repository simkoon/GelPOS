import Joi from 'joi';
import User from '../../models/user';
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
