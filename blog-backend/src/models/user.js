import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// var childSchema = new Schema({
//   name: String,
// });
// let user = {
//   _id: '123io123123@@#@!',
//   userid: 'aplle',
//   hashedPassword: String,
//   username: '김사과',
//   email: 'ㄴㄷㅅ@gamil.com',
//   storelist: [
//     {
//       _id: '21312321',
//       name: 'bbq',
//       expiredDate: '2020-10-20',
//     },
//     {
//       _id: '21312322',
//       name: 'chieken',
//       expiredDate: '2020-10-20',
//     },
//   ],
// };

// let store = {
//   _id: '21312',
//   name: 'bbq',
//   storeNum: '21312321',
//   menu: [
//     {
//       name: '후라이드',
//       price: 12000,
//     },
//     {
//       name: '양념',
//       price: 12000,
//     },
//   ],
// };

// let calendar = {
//   _id: '21321',
//   storeNum: '21312321',
// };

const childStore = new Schema({
  name: String,
  regNumber: String,
  address: String,
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본 값으로 지정
  },
  expiredDate: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new Schema({
  userid: String,
  hashedPassword: String,
  username: String,
  email: String,
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본 값으로 지정
  },
  store: [childStore],
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true / false
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function (nowstore) {
  if (!nowstore) nowstore = '';
  const token = jwt.sign(
    // 첫번째 파라미터엔 토큰 안에 집어넣고 싶은 데이터를 넣습니다
    {
      _id: this.id,
      userid: this.userid,
      username: this.username,
      email: this.email,
      store: this.store,
      nowstore: nowstore,
    },
    process.env.JWT_SECRET, // 두번째 파라미터에는 JWT 암호를 넣습니다
    {
      expiresIn: '7d', // 7일동안 유효함
    },
  );
  return token;
};

UserSchema.statics.findByUserid = function (userid) {
  return this.findOne({ userid });
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

const User = mongoose.model('User', UserSchema);
export default User;
