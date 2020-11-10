import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { tempSetUser, check } from './modules/user';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducer, { rootSaga } from './modules';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

function loadUser() {
  console.log('영어어어엉');
  try {
    const user = localStorage.getItem('user');
    console.log('인덱스 유저 로컬스토리지');
    console.log(localStorage);
    store.dispatch(check());
    console.log('sa');
    if (user === 'null' || user === null) return; // 로그인 상태가 아니라면 아무것도 안함
    console.log('여기는 인덱스에 유저로컬스토리지에서 가져오기');
    console.log(JSON.parse(user));
    store.dispatch(tempSetUser(JSON.parse(user)));
    localStorage.clear();
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}
sagaMiddleware.run(rootSaga);
loadUser();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
