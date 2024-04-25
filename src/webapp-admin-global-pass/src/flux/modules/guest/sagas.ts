import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { createGuest, getAllGuests, getGuestById } from './actions';
import { create, getAll, getById } from './service';
import { GetAllGestsResponse, PersistGuestResponse } from './types';

function* getAllGuestsSaga(): Generator {
  try {
    const response: GetAllGestsResponse = (yield call(
      getAll
    )) as GetAllGestsResponse;
    yield put(getAllGuests.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(getAllGuests.failure(errors));
  }
}

function* createGuestSaga({
  payload,
}: ReturnType<typeof createGuest.request>): Generator {
  try {
    const response: PersistGuestResponse = (yield call(
      create,
      payload
    )) as PersistGuestResponse;
    yield put(createGuest.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(createGuest.failure(errors));
  }
}

function* getGuestByIdSaga({
  payload,
}: ReturnType<typeof getGuestById.request>): Generator {
  try {
    const response: PersistGuestResponse = (yield call(
      getById,
      payload
    )) as PersistGuestResponse;
    yield put(getGuestById.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(getGuestById.failure(errors));
  }
}

export default [
  takeEvery(getAllGuests.request, getAllGuestsSaga),
  takeEvery(createGuest.request, createGuestSaga),
  takeEvery(getGuestById.request, getGuestByIdSaga),
];
