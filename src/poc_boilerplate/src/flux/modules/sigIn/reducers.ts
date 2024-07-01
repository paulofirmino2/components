import { Action, createReducer } from 'typesafe-actions';

import { IRequest, RequestStatus } from '@/models/iRequest';

import { clearSigIn, sigIn } from './actions';
import { SigIn } from './types';

const initialState: IRequest<SigIn> = {
  data: null,
  message: null,
  status: RequestStatus.idle,
};

const sigInReducer = createReducer<IRequest<SigIn>, Action>(initialState)
  .handleAction(sigIn.request, state => ({
    ...state,
    data: null,
    message: null,
    status: RequestStatus.fetching,
  }))
  .handleAction(sigIn.success, (state, action) => ({
    ...state,
    data: action.payload,
    message: null,
    status: RequestStatus.success,
  }))
  .handleAction(sigIn.failure, (state, action) => ({
    ...state,
    data: null,
    message: action.payload.message,
    status: RequestStatus.error,
  }))
  .handleAction(clearSigIn, state => ({
    ...state,
    data: null,
    message: null,
    status: RequestStatus.idle,
  }));

export default sigInReducer;
