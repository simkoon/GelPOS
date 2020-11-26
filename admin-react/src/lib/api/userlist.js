import client from './client';

export const listUserlists = () => client.get('/api/userList');

export const removeUser = userid => client.delete(`/api/userList/${userid}`);