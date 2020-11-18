import client from "./client";

//schedule
export const scheduleAdd = (schedule) => client.post("/api/schedule", schedule);

export const schedulelist = (storeid) => client.get(`/api/schedule/${storeid}`);

export const scheduleDel = (id) => client.delete(`/api/schedule/${id}`);

export const scheduleUpdate = (updateSchedule) =>
  client.post("/api/schedule/update", updateSchedule);
