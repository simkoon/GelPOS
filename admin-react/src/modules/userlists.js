import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as userlistAPI from '../lib/api/userlist';
import {takeLatest} from 'redux-saga/effects';

const [
    LIST_USERLISTS,
    LIST_USERLISTS_SUCCESS,
    LIST_USERLISTS_FAILURE
] = createRequestActionTypes('userList/LIST_USERLISTS');

export const listUserlists = createAction(
    LIST_USERLISTS,
    ({page, userid, username, email}) => ({page, userid, username, email}),
);

const listUserlistsSaga = createRequestSaga(LIST_USERLISTS, userlistAPI.listUserlists);

export function* userlistsSaga() {
    yield takeLatest(LIST_USERLISTS, listUserlistsSaga);
}

const initialState = {
    userlists: null,
    error: null,
};

const userlists = handleActions(
    {
        [LIST_USERLISTS_SUCCESS]: (state, {payload : userlists}) => ({
            ...state,
            userlists
        }),
        [LIST_USERLISTS_FAILURE]: (state, {payload : error}) => ({
            ...state,
            error,
        }),
    },
    initialState
);

export default userlists;