import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StoreListTable from './StoreListTable';
import {listUserlists} from '../../modules/userlists';

const StoreListContainer = ({ location }) => {

    const dispatch = useDispatch();
    const { userlists, error, loading } = useSelector(
      ({ userlists, loading }) => ({
        userlists: userlists.userlists,
        error: userlists.error,
        loading: loading['adminstoreList/LIST_USERLISTS'],
      }),
    );

    console.log('userlists');
    console.log(userlists);

    useEffect(() => {
      console.log('컨테이너유즈이펙트유저리스트');
      console.log(userlists);
      const { userid } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      dispatch(listUserlists({ userid }));
    }, [dispatch, location.search]);
  
    return (
      <StoreListTable
        loading={loading}
        error={error}
        user={userlists}
      />
    );
  };

  export default withRouter(StoreListContainer);