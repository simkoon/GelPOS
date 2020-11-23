import client from "./client";

export const categoryAdd = (formData) =>
  client.post("/api/menu/categoryAdd", formData);

export const addMenu = (formData) => client.post("/api/menu", formData);

export const categoryDel = (formData) =>
  client.post("/api/menu/categoryDel", formData);

export const menuList = (storeid) => client.get(`/api/menu/${storeid}`);

export const categoryUpdate = (formData) =>
  client.post("/api/menu/categoryUpdate", formData);
