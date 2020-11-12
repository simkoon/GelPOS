import client from "./client";

export const addMenu = (formData) => client.post("/api/addmenu", formData);

// export const addCategory = (formData) => client.post("/api/addmenu/addcategory", formData);