import mongoose, { Schema } from 'mongoose';

const childMenu = new Schema({
  name: String,
  price: String,
});

const childCategory = new Schema({
  name: String,
  menu: [childMenu],
});

const childTable = new Schema({
  name: String,
  tableNum: Number,
  startAt: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본 값으로 지정
  },
  nowMenu: [{ name: String, price: String, EA: Number, priceSum: String }],
});

const TablesSchema = new Schema({
  storeId: mongoose.Types.ObjectId,
  table: [childTable],
  category: [childCategory],
});

TablesSchema.statics.findByStoreId = function (storeId) {
  return this.findOne({ storeId });
};

const Tables = mongoose.model('Tables', TablesSchema);
export default Tables;
