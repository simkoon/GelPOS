import React from 'react';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationContainer = ({ location, match }) => {
  const { lastPage, userlists, loading } = useSelector(({ userlists, loading }) => ({
    lastPage: userlists.lastPage,
    userlists: userlists.userlists,
    loading: loading['userlists/LIST_USERLISTS'],
  }));

  const {userid} = match.params;

  if (!userlists || loading) return null;

  const { page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      userid={userid}
      page={parseInt(page, 10)}
      lastPage={lastPage}
    />
  );
};

export default withRouter(PaginationContainer);
