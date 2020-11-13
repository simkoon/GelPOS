import Joi from 'joi';
import Result from '../../../node_modules/postcss/lib/result';
import Invoice from '../../models/invoice';

export const read = async (ctx) => {
  const storeId = ctx.state.user.nowstore;
  console.log(storeId);
  console.log('storeid');
  const regDate = new Date(ctx.request.body.date);
  const invoiceList = await Invoice.findAllByStoreId(storeId, regDate);
  // console.log(invoiceList);
  // console.dir(regDate);
  ctx.body = invoiceList;
};
