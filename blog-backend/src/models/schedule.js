import mongoose, { Schema } from 'mongoose';

const ScheduleSchema = new Schema({
  id: mongoose.Types.ObjectId,
  storeId: String,
  title: String,
  isallday: String,
  start: Date,
  end: Date,
  category: String,
  duedateclass: String,
  location: String,
  raw: [String],
  state: String,
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);
export default Schedule;
