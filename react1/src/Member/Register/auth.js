import client from "./client";

export const login = ({ username ,password }) =>
  client.post("/api/auth/login", { username, password });

export const register = ({ userid, username, password, email}) =>
  client.post("/api/auth/register", { userid, username, password, email });

// export const code = ({ code}) =>
//   client.post("/api/auth/code", { code });

export const check = () => client.get("/api/auth/check");

export const logout = () => client.post("/api/auth/logout"); //logout api서버 호출
