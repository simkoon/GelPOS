import mongoose, { Schema } from 'mongoose';

const InvoiceSchema = new Schema({
  storeId: mongoose.Types.ObjectId,
  seq: Number,
  menu: [String],
  paymentOption: String,
  payment: String,
  regDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    userid: String,
    username: String,
    email: String,
  },
});

//바로전 해당 가게의 매출을 찾아 지금 시퀀스를 리턴하는 스태틱 매서드
InvoiceSchema.statics.findSeq = function () {};

function name(regDate) {
  regDate.getFullYear() + regDate.getMonth() + regDate.getDate();
}
InvoiceSchema.statics.findAllByStoreId = function (storeId, regDate) {
  console.log(
    regDate.getUTCFullYear() + regDate.getUTCMonth() + regDate.getUTCDate(),
  );
  const myDate = new Date(
    regDate.getUTCFullYear(),
    regDate.getUTCMonth(),
    regDate.getUTCDate(),
  );
  const myDate2 = new Date(
    regDate.getUTCFullYear(),
    regDate.getUTCMonth(),
    regDate.getUTCDate()+1,
  );
  return this.find({
    regDate: {
      $gte: myDate,
      $lt: myDate2,
    },
    storeId,
  });
};
const Invoice = mongoose.model('Invoice', InvoiceSchema);
export default Invoice;
