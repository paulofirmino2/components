import { Action, createReducer } from 'typesafe-actions';

import { IRequest, RequestStatus } from '@/models/iRequest';

import { clearDashboardInfo, getDashboardInfo } from './actions';
import { Dashboard } from './types';

const initialState: IRequest<Dashboard> = {
  data: null,
  message: null,
  status: RequestStatus.idle,
};

const dashboardReducer = createReducer<IRequest<Dashboard>, Action>(
  initialState
)
  .handleAction(getDashboardInfo.request, state => ({
    ...state,
    data: null,
    message: null,
    status: RequestStatus.fetching,
  }))
  .handleAction(getDashboardInfo.success, (state, action) => ({
    ...state,
    data: action.payload,
    message: null,
    status: RequestStatus.success,
  }))
  .handleAction(getDashboardInfo.failure, (state, action) => ({
    ...state,
    data: null,
    message: action.payload.message,
    status: RequestStatus.error,
  }))
  .handleAction(clearDashboardInfo, state => ({
    ...state,
    data: null,
    message: null,
    status: RequestStatus.idle,
  }));

export default dashboardReducer;
