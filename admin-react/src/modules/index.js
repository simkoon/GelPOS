import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import loading from './loading';
import userlists, {userlistsSaga} from './userlists';

const rootReducer = combineReducers({
    loading,
    userlists,
});

export function* rootSaga() {
    yield all([userlistsSaga()]);
}

export default rootReducer;