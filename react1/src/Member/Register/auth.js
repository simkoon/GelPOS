import client from "./client";

export const login = ({ username ,password }) =>
  client.post("/api/auth/login", { username, password });

export const register = (formData) =>
  client.post("/api/auth/register", formData);

export const code = (formData) =>
  client.post("/api/auth/code", formData);

export const check = () => client.get("/api/auth/check");

export const logout = () => client.post("/api/auth/logout"); //logout api서버 호출
