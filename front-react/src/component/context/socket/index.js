import { useState, useEffect } from 'react';
import SocketContext from './context';
import { initSockets, socket } from '../../../sockets';
import { disconnect, connect, getTables } from '../../../sockets/emit';
const SocketProvider = (props) => {
  const [value, setValue] = useState({
    tables: [],
    oneTable: false,
    loading: false,
  });

  useEffect(() => {
    disconnect();
    socket.connect('/');
    console.log(socket);
    getTables();
    initSockets({ setValue });
    return () => {
      disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
