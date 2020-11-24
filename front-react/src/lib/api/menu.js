import client from "./client";

export const categoryAdd = (formData) =>
  client.post("/api/menu/categoryAdd", formData);

export const menuAdd = (formData) => client.post("/api/menu/menuAdd", formData);

export const categoryDel = (formData) =>
  client.post("/api/menu/categoryDel", formData);

export const categoryList = (storeid) => client.get(`/api/menu/${storeid}`);

export const categoryUpdate = (formData) =>
  client.post("/api/menu/categoryUpdate", formData);

export const menuDel = (formData) => client.post("/api/menu/menuDel", formData);

export const menuUpdate = (formData) =>
  client.post("/api/menu/menuUpdate", formData);
