import React from 'react';
import styled, {css} from 'styled-components';
import qs from 'qs';
import {Link} from 'react-router-dom'

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: skyblue;

    &:disabled {
    background: gray;
    color: white;
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const PageButton = props => {
  return props.to ? (
    <StyledLink {...props} />
  ) : (
    <StyledButton {...props} />
  );
};

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;

  a {
      text-decoration: none;
  }
`;
const PageNumber = styled.div``;

const buildLink = ({ userid, page }) => {
  const query = qs.stringify({ page });
  return userid ? `/@${userid}?${query}` : `/?${query}`;
};

const Pagination = ({ page, lastPage, userid}) => {
  return (
    <PaginationBlock>
      <PageButton
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ userid, page: page - 1 })
        }
      >
        이전
      </PageButton>
      <PageNumber>{page}</PageNumber>
      <PageButton
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ userid, page: page + 1 })
        }
      >
        다음
      </PageButton>
    </PaginationBlock>
  );
};

export default Pagination;