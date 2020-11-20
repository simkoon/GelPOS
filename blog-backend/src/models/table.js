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
  startAt: Date,
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
