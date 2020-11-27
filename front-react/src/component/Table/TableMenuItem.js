import { Card } from 'react-bootstrap';
import addComma from '../../utility/addComma';

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
        <p>가격 : {addComma(menu.price)} 원</p>
      </Card.Body>
    </Card>
  );
}
