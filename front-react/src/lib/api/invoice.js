import client from './client';

export const getList = (formData) =>
  client.post('/api/invoice/getList', formData);
