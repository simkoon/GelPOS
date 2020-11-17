import client from "./client";

export const login = (formData) => client.post("/api/auth/login", formData);

export const register = (formData) =>
  client.post("/api/auth/register", formData);

export const code = (formData) => client.post("/api/auth/code", formData);

export const findCode = (formData) =>
  client.post("/api/auth/findCode", formData);

export const check = () => client.post("/api/auth/check");

export const logout = () => client.post("/api/auth/logout"); //logout api서버 호출

export const pwChange = (passEmail) =>
  client.post("/api/auth/pwChange", passEmail);
