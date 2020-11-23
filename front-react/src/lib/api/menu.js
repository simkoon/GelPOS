import client from "./client";

export const categoryAdd = (formData) =>
  client.post("/api/menu/categoryAdd", formData);

export const addMenu = (formData) => client.post("/api/menu", formData);

// export const addCategory = (formData) => client.post("/api/addmenu/addcategory", formData);

export const menuList = (storeid) => client.get(`/api/menu/${storeid}`);
