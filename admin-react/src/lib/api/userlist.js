import client from './client';

export const listUserlists = () => client.get('/api/userList');