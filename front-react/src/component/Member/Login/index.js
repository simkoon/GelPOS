import React, { useReducer, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as authAPI from '../../../lib/api/auth';
import { useSelector, useDispatch } from 'react-redux';
import { check } from '../../../modules/user';

import './CSS/Login.scss';

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        errortext: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
      };
  }
  return {
    ...state,
    [action.name]: action.value,
  };
}

function Login({ history }) {
  // redux에서 user를 가져옴

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const ReduxDispatch = useDispatch();

  const [state, dispatch] = useReducer(reducer, {
    userid: '',
    password: '',
    errortext: '0',
  });

  const { userid, password, errortext } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        userid,
        password,
      };

      const result = await authAPI.login(formData);

      try {
        localStorage.setItem('user', JSON.stringify(result.data));
        ReduxDispatch(check());
      } catch (e) {
        console.log('localStorage is not working');
      }
      history.push('/storelist');
    } catch (e) {
      console.log(e);
      const resulterror = e.response.status;
      console.log(resulterror);

      switch (resulterror) {
        case 401:
          return dispatch({ type: 'LOGIN_ERROR' });
      }
    }
  };
  useEffect(() => {
    if (user) {
      ReduxDispatch(check());
    }
  }, [ReduxDispatch, user]);
  useEffect(() => {
    if (user) {
      ReduxDispatch(check());
    }
    if (user) {
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
      history.push('/storeList');

      return;
    }
  });
  const onChange = (e) => {
    dispatch(e.target);
  };

  return (
    <>
      <div className="loginBox">
        <div className="login_logo" />
        <hr className="log_hr" />
        <form onSubmit={onSubmit}>
          <p className="inputBox">
            <input
              placeholder="아이디"
              className="login_id"
              type="text"
              minLength="5"
              maxLength="20"
              name="userid"
              autoComplete="off"
              value={userid}
              onChange={onChange}
              required
            ></input>
          </p>
          <p className="inputBox">
            <input
              placeholder="비밀번호"
              className="login_pass"
              type="password"
              minLength="8"
              maxLength="16"
              name="password"
              autoComplete="off"
              value={password}
              onChange={onChange}
              required
            ></input>
          </p>
          <p>
            <button className="login_btn">Login</button>
          </p>
          {errortext !== '0' ? (
            <p className="errortext on">{errortext}</p>
          ) : (
            <p className="errortext">{errortext}</p>
          )}
          <p>
            <Link to="/member/register">
              <span className="login_joinBtn">회원 가입</span>
            </Link>
          </p>
          <p>
            <Link to="/member/idpassfind">
              <span className="login_find">아이디 비밀번호 찾기</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default withRouter(Login);
