import '../StoreList/css/storeStyle.css';
import StoreAdd from './StoreAdd';
import { Container } from 'react-bootstrap';
import Header from '../StoreList/Header';
import { useSelector, useDispatch } from 'react-redux';
import { check } from '../../modules/user';
import { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { reTokken } from '../../lib/api/storeList';

export default withRouter(function StoreAddContainer({ history }) {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));



  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }
  }, [user, history]);

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
      <StoreAdd />
    </Container>
  );
});
