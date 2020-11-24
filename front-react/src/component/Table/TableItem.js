import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function TableItem({ table, index }) {
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
          height: '150px',
          width: '220px',
          overflow: 'auto',
        }}
      >
        <Card.Body>
          <Card.Title className="text-center">{table.name}</Card.Title>
          {table.nowMenu.map((i, index) => (
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
        </Card.Body>
      </Card>
    </Link>
  );
}
