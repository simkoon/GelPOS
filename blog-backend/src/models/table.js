import mongoose, { Schema } from 'mongoose';

const childMenu = new Schema({
  name: String,
  price: String,
  category: String,
});

const childTable = new Schema({
  tableNum: Number,
  nowMenu: [childMenu],
});

const TablesSchema = new Schema({
  storeId: mongoose.Types.ObjectId,
  table: [childTable],
  menu: [childMenu],
});

TablesSchema.statics.findByStoreId = function (storeId) {
  return this.findOne({ storeId });
};

const Tables = mongoose.model('Tables', TablesSchema);
export default Tables;
