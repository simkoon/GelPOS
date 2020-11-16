import client from './client';

export const reToken = () => client.get('/api/storeList/reToken');

export const selectStore = (nowstore) =>
  client.post('/api/storeList/selectStore', { nowstore });
