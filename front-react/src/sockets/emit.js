import { socket } from './index';
export const getTables = () => {
  socket.emit('getTables');
};
export const getOneTable = (seq) => {
  console.log('실행됨');
  socket.emit('getOneTable', { seq: seq });
};
export const onModifyTable = (table, item, seq, act) => {
  socket.emit('modifyTable', { table, item, seq, act });
};
export const onPaymentTable = (table, seq, act, getSum) => {
  socket.emit('paymentTable', { table, seq, act, getSum });
};

export const disconnect = () => {
  console.log('disconnect 실행됨');
  socket.close();
  socket.disconnect();
};
export const connect = () => {
  console.log('connect 실행됨!!');
  socket.connect('/');
};
