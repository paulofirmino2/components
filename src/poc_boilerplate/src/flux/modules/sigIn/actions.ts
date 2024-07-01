import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { SigIn, SigInRequest } from './types';

export const sigIn = createAsyncAction(
  'SIGN_INFO_REQUEST',
  'SIGN_INFO_SUCCESS',
  'SIGN_INFO_ERROR'
)<SigInRequest, SigIn, Error | AxiosError>();

export const clearSigIn = createAction('CLEAR_SIGN_IN')();
