import mongoose, { Schema } from 'mongoose';

const menuSchema = new Schema({
  storeid: {
    type: String,
  },
  menuCategory: String,
  _Id: mongoose.Types.ObjectId,
  menuName: String,
  menuPrice: Number,
});

// const categorySchema = new Schema({
//     storeId : {
//         type: String,
//         default: '123'
//     },
//     _Id: mongoose.Types.ObjectId,
//     categoryName: String
// });

export const Menu = mongoose.model('Menu', menuSchema);
// export const Category = mongoose.model('Category', categorySchema);
