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
    if (user) {
      (async () => {
        const body = await reTokken();
        console.log(body);
      })();
      return;
    }
  });

  console.log('컨테이너 아래 유저');
  console.log(user);
  useEffect(() => {
    if (user === null || user === 'null') {
      console.log('여기들옴 컨테이너 히스토리 푸시시');
      history.push('/');
    }
  });

  return (
    <>
      {user ? (
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
          <StoreList user={user} />
        </Container>
      ) : null}
    </>
  );
});
