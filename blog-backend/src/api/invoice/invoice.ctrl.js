import Joi from 'joi';
import Result from '../../../node_modules/postcss/lib/result';
import Invoice from '../../models/invoice';

export const read = async (ctx) => {
  const storeId = ctx.state.user.nowstore;

  //  시퀀스 받는 함수 테스트
  //  const getseq = await Invoice.findSeq(storeId);

  const regDate = new Date(ctx.request.body.date);
  const invoiceList = await Invoice.findAllByStoreId(storeId, regDate);

  ctx.body = invoiceList;
};
