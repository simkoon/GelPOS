import { Tab, Nav, Row } from 'react-bootstrap';
import TableMenuItem from './TableMenuItem';
export default function TableMenuList({ category, modifyTable }) {
  return (
    <Tab.Container defaultActiveKey={category[0].name}>
      <Nav variant="tabs">
        {category.map((item, index) => {
          return (
            <Nav.Item key={item._id}>
              <Nav.Link eventKey={item.name}>{item.name}</Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
      <Tab.Content className="h-100 w-100">
        {category.map((item, keys) => {
          return (
            <Tab.Pane
              key={keys}
              eventKey={item.name}
              className="p-4 row h-100 w-100"
            >
              <Row className="p-2">
                {item.menu.map((menu, index) => {
                  return (
                    <TableMenuItem
                      key={index}
                      menu={menu}
                      modifyTable={modifyTable}
                    />
                  );
                })}
              </Row>
            </Tab.Pane>
          );
        })}
      </Tab.Content>
    </Tab.Container>
  );
}
