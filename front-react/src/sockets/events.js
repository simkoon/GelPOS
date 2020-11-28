import { socket } from './index';
export const socketEvents = ({ setValue }) => {
  socket.on('getTables', ({ table }) => {
    setValue((state) => {
      return { ...state, tables: table, loading: true };
    });
  });
  socket.on('getOneTable', (data) => {
    console.log(data);
    setValue((state) => {
      return {
        ...state,
        oneTable: {
          table: data.table[0],
          category: data.category,
        },
      };
    });
  });
};
