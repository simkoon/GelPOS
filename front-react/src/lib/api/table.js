import client from "./client";

export const tableAdd = (formData) =>
  client.post("/api/table/tableAdd", formData);

export const tableList = (storeid) => client.get(`/api/table/${storeid}`);

export const tableDel = (formData) =>
  client.post("/api/table/tableDel", formData);

export const tableUpdate = (formData) =>
  client.post("/api/table/tableUpdate", formData);

// export const menuAdd = (formData) => client.post("/api/menu/menuAdd", formData);

// export const categoryDel = (formData) =>
//   client.post("/api/menu/categoryDel", formData);

// export const categoryList = (storeid) => client.get(`/api/menu/${storeid}`);

// export const categoryUpdate = (formData) =>
//   client.post("/api/menu/categoryUpdate", formData);

// export const menuUpdate = (formData) =>
//   client.post("/api/menu/menuUpdate", formData);
