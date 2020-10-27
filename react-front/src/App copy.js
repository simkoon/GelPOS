import React from 'react';
import {
    ButtonGroup,
    Button,
    Col,
    Container,
    Row,
    Dropdown,
    DropdownButton,
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
    return (
        <div > 
            <Container fluid>
                <Row style={{ height: '100%' }}>
                    <ButtonGroup vertical>
                        <Button>Button</Button>
                        <Button>Button</Button>

                        <DropdownButton
                            as={ButtonGroup}
                            title="Dropdown"
                            id="bg-vertical-dropdown-1"
                        >
                            <Dropdown.Item eventKey="1">
                                Dropdown link
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Dropdown link
                            </Dropdown.Item>
                        </DropdownButton>

                        <Button>Button</Button>
                        <Button>Button</Button>

                        <DropdownButton
                            as={ButtonGroup}
                            title="Dropdown"
                            id="bg-vertical-dropdown-2"
                        >
                            <Dropdown.Item eventKey="1">
                                Dropdown link
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Dropdown link
                            </Dropdown.Item>
                        </DropdownButton>

                        <DropdownButton
                            as={ButtonGroup}
                            title="Dropdown"
                            id="bg-vertical-dropdown-3"
                        >
                            <Dropdown.Item eventKey="1">
                                Dropdown link
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Dropdown link
                            </Dropdown.Item>
                        </DropdownButton>
                    </ButtonGroup>
                    <Row>
                        <Col>hi</Col>
                    </Row>
                </Row>
            </Container>
        </div>
    );
}

export default App;
