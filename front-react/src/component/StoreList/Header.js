import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function Header() {
  return (
    <>
      <Navbar
        className="w-100"
        expand="lg"
        style={{
          flex: 1,
          backgroundColor: "rgb(251,252,254)",
          boxSizing: "border-box",
        }}
      >
        {" "}
        <Link to="/">
          <Navbar.Brand
            className="font-weight-bolder"
            style={{
              color: "rgb(62,78,93)",
            }}
          >
            GELPOS
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link
              to="/"
              style={{
                color: "rgb(62,78,93)",
              }}
              className=" small font-weight-normal nav-link"
            >
              홈으로
            </Link>
            <Link
              href="/"
              className="small font-weight-normal nav-link"
              style={{
                color: "rgb(62,78,93)",
              }}
            >
              고객센터
            </Link>
            <Nav.Link
              style={{
                color: "rgb(62,78,93)",
              }}
              href="/link"
              className="small font-weight-normal"
            >
              로그아웃
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
export default Header;
