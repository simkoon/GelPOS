import "./css/storeStyle.css";
import StoreList from "./StoreList";
import { Container } from "react-bootstrap";
import Header from './Header';

export default function StoreListContainer() {
  return (
    <Container
      fluid
      className="d-flex h-100 w-100 flex-column w-100  justify-content-center "
      style={{
        height: "100%",
        padding: 0,
        margin: 0,
        backgroundColor: "rgb(249,250,252)",
      }}
    ><Header/>
      <StoreList />
    </Container>
  );
}
