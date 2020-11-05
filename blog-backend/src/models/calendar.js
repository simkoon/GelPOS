import mongoose, { Schema } from 'mongoose';

// 스키마 정의 Toast 참고해야 할 듯
const CalendarSchema = new Schema({
  storeId: mongoose.Types.ObjectId,
});

const Calendar = mongoose.model('Calendar', CalendarSchema);
export default Calendar;
