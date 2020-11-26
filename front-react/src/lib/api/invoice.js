import client from './client';

export const getList = (formData) =>
  client.post('/api/invoice/getList', formData);

export const refund = (formDate) => {
  client.post('/api/invoice/refund', formDate);
};
