import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserListTable from './UserListTable';
import {listUserlists} from '../../modules/userlists';

