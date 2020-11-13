import client from "./client";

export const login = (formData) => client.post("/api/auth/login", formData);

export const register = (formData) =>
  client.post("/api/auth/register", formData);

export const code = (formData) => client.post("/api/auth/code", formData);

export const check = () => client.post("/api/auth/check");

export const logout = () => client.post("/api/auth/logout"); //logout api서버 호출

//schedule
export const schedule = (schedule) => client.post("/api/schedule", schedule);

export const schedulelist = (storeid) => {
  client.get(`/api/schedule/${storeid}`);
};
