import "./css/storeStyle.css";
import StoreList from "./StoreList";
import { Container } from "react-bootstrap";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { check } from "../../modules/user";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { reToken } from "../../lib/api/storeList";
import { selectStore } from "../../lib/api/storeList";
import { logout } from "../../modules/user";

export default withRouter(function StoreListContainer({ history }) {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const onLogout = () => {
    dispatch(logout());
    //history.push("/");
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const body = await reToken();
        user.nowstore = null;
        try {
          localStorage.setItem("user", JSON.stringify(body.datas));
        } catch (error) {
          console.log("localStorage is not working");
        }
      })();
      return;
    }
  }, [user]);

  useEffect(() => {
    if (user === null || user === "null") {
      history.push("/");
    }
  });

  const onSelect = async (nowstore) => {
    console.log(nowstore);
    const result = await selectStore(nowstore);
    console.log(result);
    dispatch(check());
    try {
      localStorage.setItem("user", JSON.stringify(result.data));
    } catch (error) {
      console.log("localStorage is not working");
    }

    history.push("/store/invoice");
  };
  return (
    <>
      {user ? (
        <Container
          fluid
          className="d-flex h-100 w-100 flex-column w-100  justify-content-center "
          style={{
            height: "100%",
            padding: 0,
            margin: 0,
            backgroundColor: "rgb(249,250,252)",
          }}
        >
          <Header onLogout={onLogout} />
          <StoreList user={user} onClick={onSelect} />
        </Container>
      ) : null}
    </>
  );
});
