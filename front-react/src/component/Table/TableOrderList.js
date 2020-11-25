import { OverlayTrigger, Popover, ButtonGroup, Button } from 'react-bootstrap';
import addComma from '../../utility/addComma';

export default function TableOrderList({ menu, menuSeq, modifyTable }) {
  return (
    <OverlayTrigger
      rootCloseEvent="click"
      rootClose={true}
      trigger="click"
      placement="left"
      overlay={
        <Popover id={`popover-${menuSeq}`}>
          <Popover.Title as="h6" className="text-center">
            수량
          </Popover.Title>
          <Popover.Content>
            <ButtonGroup>
              <Button
                variant="danger"
                onClick={() => {
                  modifyTable('subtract', menu);
                }}
              >
                {' '}
                -{' '}
              </Button>
              <div
                className="btn"
                style={{
                  cursor: 'default',
                }}
              >
                {menu.EA}
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  modifyTable('add', menu);
                }}
              >
                {' '}
                +{' '}
              </Button>
            </ButtonGroup>
          </Popover.Content>
        </Popover>
      }
    >
      <tr>
        <td>{menuSeq}</td>
        <td>{menu.name}</td>
        <td>{menu.EA}</td>
        <td>{addComma(menu.price)}</td>
        <td>{addComma(menu.priceSum)}</td>
      </tr>
    </OverlayTrigger>
  );
}
