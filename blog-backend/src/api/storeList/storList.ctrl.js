import Joi from 'joi';
import User from '../../models/user';

async () => {
  const user = await User.findByUserid('test1');
  user.store.push({ name: 'hi' });
  let store = user.store;
  console.log(store);
};

export const register = async (ctx) => {
  console.log;
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
  const userObjectId = '5f9ad8ce0eda3c19f52bc635';
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
  } catch (error) {
    ctx.throw(500, error);
  }
};
