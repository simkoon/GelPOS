import { Card } from 'react-bootstrap';

export default function TableItem({ table }) {
  return (
    <Card
      className="col-xs-2"
      style={{
        height: '150px',
        margin: '20px',
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
  );
}
