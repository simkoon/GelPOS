import { createContext } from 'react';

const SocketContext = createContext({
  tables: [],
  oneTable: false,
  loading: false,
});
export default SocketContext;
