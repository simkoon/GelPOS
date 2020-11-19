import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserListTable from './UserListTable';
import {listUserlists} from '../../modules/userlists';

const UserListContainer = ({ location }) => {
    const dispatch = useDispatch();
    const { userlists, error, loading } = useSelector(
      ({ userlists, loading }) => ({
        userlists: userlists.userlists,
        error: userlists.error,
        loading: loading['userlists/LIST_USERLISTS'],
      }),
    );
    useEffect(() => {
      const { page, userid, username, email } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      dispatch(listUserlists({ page, userid, username, email }));
    }, [dispatch, location.search]);
  
    return (
      <UserListTable
        loading={loading}
        error={error}
        userlists={userlists}
      />
    );
  };
  
  export default withRouter(UserListContainer);