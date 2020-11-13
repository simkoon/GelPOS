import client from './client';

export const reTokken = () => client.get('/api/storeList/reToken');

export const selectStore = (nowstore) =>
  client.post('/api/storeList/selectStore', { nowstore });
