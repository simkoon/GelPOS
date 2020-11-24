import { Card } from 'react-bootstrap';

export default function TableMenuItem({ menu, index, modifyTable }) {
  return (
    <Card
      className="col-xs-2 m-2 btn btn-light"
      style={{
        height: '120px',
        width: '190px',
        overflow: 'auto',
      }}
      onClick={() => {
        modifyTable('add', menu);
      }}
    >
      <Card.Body>
        <Card.Title className="text-center">{menu.name}</Card.Title>
        <p>가격 : {menu.price}</p>
      </Card.Body>
    </Card>
  );
}
