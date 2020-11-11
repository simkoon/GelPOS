import '../StoreList/css/storeStyle.css';
import StoreAdd from './StoreAdd';
import { Container } from 'react-bootstrap';
import Header from '../StoreList/Header';
import { useSelector, useDispatch } from 'react-redux';
import { check } from '../../modules/user';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { add } from '../../lib/api/storeAdd';
import { useState } from 'react';

export default withRouter(function StoreAddContainer({ history }) {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const [inputs, setInputs] = useState({
    storename: '',
    regnumber: '',
    address: '',
  });
  const { storename, regnumber, address } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setInputs(() => ({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: storename,
      regNumber: regnumber,
      address,
    };
    try {
      const result = await add(formData);
      console.log(result);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user === null || user === 'null') {
      console.log('여기들옴 컨테이너 히스토리 푸시시');
      history.push('/');
    }
  }, [history, user]);

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
      <StoreAdd onChange={onChange} onSubmit={onSubmit} inputs={inputs} />
    </Container>
  );
});
