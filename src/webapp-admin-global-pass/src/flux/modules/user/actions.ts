import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { Role } from '@/types/Guest';

import { EmployeeMe } from './types';

export const getUserInfo = createAsyncAction(
  'GET_USER_INFO_USER_REQUEST',
  'GET_USER_INFO_USER_SUCCESS',
  'GET_USER_INFO_USER_ERROR'
)<undefined, EmployeeMe, Error | AxiosError>();

export const clearUserInfo = createAction('CLEAR_USER_INFO')();

export const setUserRole = createAction('SET_USER_ROLE')<Role | undefined>();
