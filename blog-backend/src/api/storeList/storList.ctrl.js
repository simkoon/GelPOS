import Joi from 'joi';
import User from '../../models/user';

async () => {
  const user = await User.findByUserid('test1');
  user.store.push({ name: 'hi' });
  let store = user.store;
  console.log(store);
  
};

export const register = async (ctx) => {
  const schema = Joi.object().keys({
    name: Joi.string().required,
    regNumber: Joi.string().required,
    address: Joi.string().required,
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { name, regNumber, address } = ctx.request.body;
  const store = null;
};
