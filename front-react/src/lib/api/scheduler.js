import client from "./client";

//schedule
export const schedule = (schedule) => client.post("/api/schedule", schedule);
    


export const schedulelist = (storeid) => client.get(`/api/schedule/${storeid}`);