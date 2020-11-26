import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
export default function TableItem({ table, index }) {
  const getmenus = useCallback((menu) => {
    if (menu.length > 2) {
      return [menu[0], menu[1]];
    } else {
      return menu;
    }
  }, []);
  return (
    <Link
      className="nav-link p-0"
      to={`/store/TableDetail/${index}`}
      style={{
        margin: '25px',
        color: 'black',
      }}
    >
      <Card
        className="col-xs-2"
        style={{
          height: '180px',
          width: '220px',
          overflow: 'auto',
          borderRadius: '8px',
        }}
      >
        <Card.Body>
          <Card.Title className="text-center">{table.name}</Card.Title>
          {getmenus(table.nowMenu).map((i, index) => (
            <p
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>{i.name}</span>
              <span
                style={{
                  paddingLeft: 'auto',
                }}
              >
                {i.EA}
              </span>
            </p>
          ))}
          {table.nowMenu.length > 2 ? (
            <p
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              외 {table.nowMenu.length}
            </p>
          ) : null}
        </Card.Body>
      </Card>
    </Link>
  );
}
