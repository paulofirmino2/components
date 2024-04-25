import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { getDashboardInfo } from './actions';
import { getInfo } from './service';
import { DashboardResponse } from './types';

function* getDashboardInfoSaga(): Generator {
  try {
    const response: DashboardResponse = (yield call(
      getInfo
    )) as DashboardResponse;
    yield put(getDashboardInfo.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(getDashboardInfo.failure(errors));
  }
}

export default [takeEvery(getDashboardInfo.request, getDashboardInfoSaga)];
