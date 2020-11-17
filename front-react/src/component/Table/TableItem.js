import { Card, Col } from 'react-bootstrap';

export default function TableItem() {
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
        <Card.Title>테이블 이름</Card.Title>
      </Card.Body>
    </Card>
  );
}
