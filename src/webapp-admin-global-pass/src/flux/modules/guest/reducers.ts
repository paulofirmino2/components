import { Action, createReducer } from 'typesafe-actions';

import { RequestStatus } from '@/models/iRequest';

import {
  clearCreateGuest,
  createGuest,
  getAllGuests,
  getGuestById,
} from './actions';
import { IGuest } from './types';

const initialState: IGuest = {
  allGests: { data: null, message: null, status: RequestStatus.idle },
  create: { data: null, message: null, status: RequestStatus.idle },
  getById: { data: null, message: null, status: RequestStatus.idle },
};

const guestReducer = createReducer<IGuest, Action>(initialState)
  .handleAction(getAllGuests.request, state => ({
    ...state,
    allGests: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(getAllGuests.success, (state, action) => ({
    ...state,
    allGests: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(getAllGuests.failure, (state, action) => ({
    ...state,
    allGests: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(createGuest.request, state => ({
    ...state,
    create: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(createGuest.success, (state, action) => ({
    ...state,
    create: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(createGuest.failure, (state, action) => ({
    ...state,
    create: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(getGuestById.request, state => ({
    ...state,
    getById: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(getGuestById.success, (state, action) => ({
    ...state,
    getById: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(getGuestById.failure, (state, action) => ({
    ...state,
    getById: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(clearCreateGuest, state => ({
    ...state,
    create: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }));

export default guestReducer;
