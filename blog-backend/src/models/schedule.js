import mongoose, { Schema } from 'mongoose';

const ScheduleSchema = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열로 이루어진 배열
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본 값으로 지정
  },
  user: {
    _id: mongoose.Types.ObjectId,
    userid: String,
    username: String,
    email: String,
  },
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);
export default Schedule;
