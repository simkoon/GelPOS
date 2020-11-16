import { Table } from 'react-bootstrap';

export default function InvoiceItem({ menu }) {
  let getSum = 0;
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>메 뉴 명</th>
            <th>단 가</th>
            <th>수량</th>
            <th>금 액</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item, index) => {
            getSum += Number(item.sum);
            return (
              <>
                <tr>
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.EA}</td>
                  <td>{item.sum}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <span>총액 :</span>
        <span className="ml-1">{getSum} 원</span>
      </div>
    </div>
  );
}