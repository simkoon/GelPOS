import client from './client';

export const add = (formData) =>
  client.post('/api/storeList/register', formData);
