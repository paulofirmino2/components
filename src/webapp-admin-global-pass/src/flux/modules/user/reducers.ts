import { Action, createReducer } from 'typesafe-actions';

import { IRequest, RequestStatus } from '@/models/iRequest';

import { clearUserInfo, getUserInfo, setUserRole } from './actions';
import { EmployeeMe } from './types';

const initialState: IRequest<EmployeeMe> = {
  data: null,
  message: null,
  status: RequestStatus.idle,
};

const sigInReducer = createReducer<IRequest<EmployeeMe>, Action>(initialState)
  .handleAction(getUserInfo.request, state => ({
    ...state,
    data: null,
    message: null,
    status: RequestStatus.fetching,
  }))
  .handleAction(getUserInfo.success, (state, action) => ({
    ...state,
    data: action.payload,
    message: null,
    status: RequestStatus.success,
  }))
  .handleAction(getUserInfo.failure, (state, action) => ({
    ...state,
    data: null,
    message: action.payload.message,
    status: RequestStatus.error,
  }))
  .handleAction(clearUserInfo, state => ({
    ...state,
    data: null,
    message: null,
    status: RequestStatus.idle,
  }))
  .handleAction(setUserRole, (state, action) => ({
    ...state,
    data: state.data && { ...state.data, role: action.payload },
    message: null,
    status: RequestStatus.success,
  }));
export default sigInReducer;
