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
        loading: loading['userList/LIST_USERLISTS'],
      }),
    );
    useEffect(() => {
      const { userid } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      dispatch(listUserlists({ userid }));
    }, [dispatch, location.search]);
  
    return (
      <UserListTable
        loading={loading}
        error={error}
        user={userlists}
      />
    );
  };
  
  export default withRouter(UserListContainer);