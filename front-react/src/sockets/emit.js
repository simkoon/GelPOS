import { socket } from './index';
export const getTables = () => {
  console.log('에밋에서 겟테이블 함수 실행!!!!');
  socket.emit('getTables');
};
export const getOneTable = (seq) => {
  socket.emit('getOneTable', { seq: seq });
};
export const onModifyTable = (table, item, seq, act) => {
  socket.emit('modifyTable', { table, item, seq, act });
};
export const onPaymentTable = (table, seq, act, getSum) => {
  socket.emit('paymentTable', { table, seq, act, getSum });
};

export const disconnect = () => {
  socket.close();
  socket.disconnect();
};
export const connect = () => {
  socket.connect('/');
  console.log('커넥션실행됨');
  console.log(socket);
  getTables();
};
export const onLoading = () => {
  socket.emit('loadingState');
};
