import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function Header({ onLogout }) {
  return (
    <>
      <Navbar
        className="w-100"
        expand="lg"
        style={{
          flex: 1,
          backgroundColor: 'rgb(251,252,254)',
          boxSizing: 'border-box',
        }}
      >
        {' '}
        <Link to="/">
          <Navbar.Brand
            className="font-weight-bolder"
            style={{
              color: 'rgb(62,78,93)',
            }}
          >
            GELPOS
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <div
              style={{
                color: 'rgb(62,78,93)',
                cursor: 'pointer',
              }}
              className=" small font-weight-normal nav-link"
              onClick={onLogout}
            >
              로그아웃
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
export default Header;
