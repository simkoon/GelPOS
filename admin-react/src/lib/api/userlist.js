import client from './client';

export const listUserlists = () => client.get('/api/UserList');

export const removeUser = userid => client.delete(`/api/UserList/${userid}`);