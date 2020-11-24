import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserListTable from './UserListTable';
import {listUserlists} from '../../modules/userlists';
import {removeUser} from '../../lib/api/userlist';

const UserListContainer = ({ match, location, history }) => {
    const { userid } = match.params;

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

    const onRemove = async () => {
      try {
        await removeUser(userid);
        history.push('/userList');
      } catch(e) {
        console.log(e);
      }
    };
  
    return (
      <UserListTable
        loading={loading}
        error={error}
        user={userlists}
        onRemove={onRemove}
      />
    );
  };


  export default withRouter(UserListContainer);