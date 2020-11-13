import mongoose, { Schema } from 'mongoose';

const ScheduleSchema = new Schema({
  storeid: String,
  Schedulelist: [
    {
      id: mongoose.Types.ObjectId,
      title: String,
      isallday: String,
      start: Date,
      end: Date,
      category: String,
      duedateclass: String,
      location: String,
      raw: [Object],
      state: String,
    },
  ],
  filter: [{}, {}],
});

ScheduleSchema.statics.findByStoreid = function (storeid) {
  return this.findOne({ storeid });
};

const Schedule = mongoose.model('Schedule', ScheduleSchema);
export default Schedule;
