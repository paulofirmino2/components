import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { getUserInfo } from './actions';
import { getUser } from './service';
import { UserResponse } from './types';

function* getUserInfoSaga(): Generator {
  try {
    const response: UserResponse = (yield call(getUser)) as UserResponse;
    yield put(getUserInfo.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(getUserInfo.failure(errors));
  }
}

export default [takeEvery(getUserInfo.request, getUserInfoSaga)];
