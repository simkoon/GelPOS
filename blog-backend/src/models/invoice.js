import mongoose, { Schema } from 'mongoose';

const InvoiceSchema = new Schema({
  storeId: mongoose.Types.ObjectId,
  seq: { type: Number, default: 0 },
  menu: [
    {
      name: String,
      price: String,
      EA: Number,
      priceSum: String,
    },
  ],
  paymentOption: String,
  payment: String,
  regDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    userid: String,
  },
});

//바로전 해당 가게의 매출을 찾아 지금 시퀀스를 리턴하는 스태틱 매서드
InvoiceSchema.statics.findSeq = function (storeId) {
  return this.findOne({ storeId }, {}, { sort: { regDate: -1 } });
};
InvoiceSchema.statics.findAllByStoreId = function (storeId, regDate) {
  const myDate = new Date(
    regDate.getUTCFullYear(),
    regDate.getUTCMonth(),
    regDate.getUTCDate(),
  );
  const myDate2 = new Date(
    regDate.getUTCFullYear(),
    regDate.getUTCMonth(),
    regDate.getUTCDate() + 1,
  );
  return this.find({
    regDate: {
      $gte: myDate,
      $lt: myDate2,
    },
    storeId,
  });
};

InvoiceSchema.statics.findOneByStoreIdAndSeq = function (storeId, seq) {
  return this.findOne({ storeId, seq });
};

const Invoice = mongoose.model('Invoice', InvoiceSchema);
export default Invoice;
