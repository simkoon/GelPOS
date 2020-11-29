import { createContext } from 'react';

const SocketContext = createContext({
  tables: false,
  oneTable: false,
  loading: false,
});
export default SocketContext;
