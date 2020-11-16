import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as userlistAPI from '../lib/api/userlist';
import {takeLatest} from 'redux-saga/effects';