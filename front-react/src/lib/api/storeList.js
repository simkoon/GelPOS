import client from './client';

export const reTokken = () => client.get('/api/storeList/reToken');
