import { AxiosError } from 'axios';
import { findIndex } from 'lodash';
import { call, put, takeEvery } from 'redux-saga/effects';

import {
  createCompany,
  editCompany,
  getCompanyById,
  getUserCompany,
  myCompanies,
} from './actions';
import {
  create,
  getById,
  getMyCompanies,
  getUserCompany as getUserCompanyService,
  update,
} from './service';
import {
  GetCompanyByIdResponse,
  MyCompaniesResponse,
  PersistCompanyResponse,
  UserCompaniesResponse,
} from './types';

function* myCompaniesSaga(): Generator {
  try {
    const response: MyCompaniesResponse = (yield call(
      getMyCompanies
    )) as MyCompaniesResponse;
    yield put(myCompanies.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(myCompanies.failure(errors));
  }
}

function* createCompanySaga({
  payload,
}: ReturnType<typeof createCompany.request>): Generator {
  try {
    const response: PersistCompanyResponse = (yield call(
      create,
      payload
    )) as PersistCompanyResponse;
    yield put(createCompany.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(createCompany.failure(errors));
  }
}

function* getCompanyByIdSaga({
  payload,
}: ReturnType<typeof getCompanyById.request>): Generator {
  try {
    const response: GetCompanyByIdResponse = (yield call(
      getById,
      payload
    )) as GetCompanyByIdResponse;
    const idx = findIndex(response.data, ['id', payload]);
    if (idx !== -1) {
      yield put(getCompanyById.success(response.data[idx]));
    }
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(getCompanyById.failure(errors));
  }
}

function* editCompanySaga({
  payload,
}: ReturnType<typeof editCompany.request>): Generator {
  try {
    const response: PersistCompanyResponse = (yield call(
      update,
      payload
    )) as PersistCompanyResponse;
    yield put(editCompany.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(editCompany.failure(errors));
  }
}

function* getUserCompanySaga(): Generator {
  try {
    const response: UserCompaniesResponse = (yield call(
      getUserCompanyService
    )) as UserCompaniesResponse;
    yield put(getUserCompany.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(getUserCompany.failure(errors));
  }
}
export default [
  takeEvery(myCompanies.request, myCompaniesSaga),
  takeEvery(createCompany.request, createCompanySaga),
  takeEvery(getCompanyById.request, getCompanyByIdSaga),
  takeEvery(editCompany.request, editCompanySaga),
  takeEvery(getUserCompany.request, getUserCompanySaga),
];
