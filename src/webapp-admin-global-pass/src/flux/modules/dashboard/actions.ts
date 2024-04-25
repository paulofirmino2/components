import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { Dashboard } from './types';

export const getDashboardInfo = createAsyncAction(
  'DASHBOARD_REQUEST',
  'DASHBOARD_SUCCESS',
  'DASHBOARD_ERROR'
)<undefined, Dashboard, Error | AxiosError>();

export const clearDashboardInfo = createAction('CLEAR_DASHBOARD')();
