import Joi from 'joi';
import Invoice from '../../models/invoice';

export const read = async (ctx) => {
  const storeId = ctx.state.user.nowstore;

  //  시퀀스 받는 함수 테스트
  //  const getseq = await Invoice.findSeq(storeId);

  const regDate = new Date(ctx.request.body.date);
  const invoiceList = await Invoice.findAllByStoreId(storeId, regDate);
  console.log(invoiceList);
  ctx.body = invoiceList;
};

export const refund = async (ctx) => {
  const storeId = ctx.state.user.nowstore;

  const prevInvoice = await Invoice.findOneByStoreIdAndSeq(
    storeId,
    ctx.request.body._seq,
  );
  let seq = 0;
  const seqInvoice = await Invoice.findSeq(storeId);
  if (seqInvoice) {
    seq = seqInvoice.seq + 1;
  }
  console.log(seqInvoice);
  const refundedInvoice = new Invoice({
    storeId: storeId,
    seq,
    menu: prevInvoice.menu,
    paymentOption: '환불',
    payment: prevInvoice.payment,
    user: prevInvoice.user,
  });

  try {
    const result = await refundedInvoice.save();
    ctx.body = result;
  } catch (error) {
    ctx.body = error;
  }
};
