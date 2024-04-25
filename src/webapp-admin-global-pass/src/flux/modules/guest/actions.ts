import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { Guest } from './types';

export const getAllGuests = createAsyncAction(
  'GET_ALL_GUESTS_REQUEST',
  'GET_ALL_GUESTS_SUCCESS',
  'GET_ALL_GUESTS_ERROR'
)<undefined, Guest[], Error | AxiosError>();

export const createGuest = createAsyncAction(
  'CREATE_GUEST_REQUEST',
  'CREATE_GUEST_SUCCESS',
  'CREATE_GUEST_ERROR'
)<Guest, Guest, Error | AxiosError>();

export const getGuestById = createAsyncAction(
  'GET_GUEST_BY_ID_REQUEST',
  'GET_GUEST_BY_ID_SUCCESS',
  'GET_GUEST_BY_ID_ERROR'
)<string, Guest, Error | AxiosError>();

export const clearCreateGuest = createAction('CLEAR_CREATE_GUEST')();
