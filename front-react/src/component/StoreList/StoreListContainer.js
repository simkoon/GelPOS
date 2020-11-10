import './css/storeStyle.css';
import StoreList from './StoreList';
import { Container } from 'react-bootstrap';
import Header from './Header';
import { useSelector, useDispatch } from 'react-redux';
import { check } from '../../modules/user';
import { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { reTokken } from '../../lib/api/storeList';

export default withRouter(function StoreListContainer({ history }) {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  console.log('컨테이너 위쪽 유저');
  console.log(user === null);
  console.log(user);
  useEffect(() => {
    (async () => {
      const body = await reTokken();
      console.log(body);
    })();
  });

  if (user === null || user === 'null') {
    history.push('/');
  }

  console.log('컨테이너 아래 유저');
  console.log(user);
  return (
    <Container
      fluid
      className="d-flex h-100 w-100 flex-column w-100  justify-content-center "
      style={{
        height: '100%',
        padding: 0,
        margin: 0,
        backgroundColor: 'rgb(249,250,252)',
      }}
    >
      <Header />
      {!(user.store === 'null') ? <StoreList user={user} /> : null}
    </Container>
  );
});
