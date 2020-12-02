import mongoose, { Schema } from 'mongoose';

const ScheduleSchema = new Schema({
  storeid: String,
  Schedulelist: [
    {
      id: String,
      title: String,
      isAllDay: Boolean,
      start: Date,
      end: Date,
      category: String,
      duedateclass: String,
      location: String,
      raw: [Object],
      state: String,
      calendarId: String,
    },
  ],
  filter: [{}, {}],
});

ScheduleSchema.statics.findByStoreid = function (storeid) {
  return this.findOne({ storeid });
};

const Schedule = mongoose.model('Schedule', ScheduleSchema);
export default Schedule;
