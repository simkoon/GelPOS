import { socket } from './index';
export const socketEvents = ({ setValue }) => {
  socket.on('getTables', ({ table }) => {
    setValue((state) => {
      return { ...state, tables: table };
    });
  });
  socket.on('getOneTable', (data) => {
    setValue((state) => {
      return {
        ...state,
        oneTable: {
          table: data.table[0],
          category: data.category,
        },
        loading: true,
      };
    });
  });
  socket.on('loadingState', () => {
    setValue((state) => ({
      ...state,
      loading: false,
    }));
  });
};
