/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios, { AxiosError } from 'axios';
import { findIndex } from 'lodash';
import { call, put, takeEvery } from 'redux-saga/effects';

import { EmployeeError, ErrorType } from '@/models/errors';

import {
  createAccessSectorEmployee,
  createEmployee,
  deleteEmployeeById,
  editEmployee,
  editEmployeePhoto,
  getEmployeeById,
  searchEmployees,
} from './actions';
import {
  create,
  createAccessSector,
  deleteEmployee,
  edit,
  editPhoto,
  getById,
  search,
} from './service';
import {
  AccessSectorEmployeeResponse,
  EmployeeByIdResponse,
  EmployeeEditPhotoResponse,
  EmployeeResponse,
  EmployeesSearchResponse,
} from './types';

function* searchEmployeesSaga({
  payload,
}: ReturnType<typeof searchEmployees.request>): Generator {
  try {
    const response: EmployeesSearchResponse = (yield call(
      search,
      payload
    )) as EmployeesSearchResponse;
    yield put(searchEmployees.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(searchEmployees.failure(errors));
  }
}

function* createEmployeeSaga({
  payload,
}: ReturnType<typeof createEmployee.request>): Generator {
  try {
    const response: EmployeeResponse = (yield call(
      create,
      payload
    )) as EmployeeResponse;
    yield put(createEmployee.success(response.data));
  } catch (err) {
    const sanitizedError: AxiosError<EmployeeError> = new AxiosError();
    if (axios.isAxiosError(err)) {
      const errorData = (err as AxiosError<EmployeeError>).response?.data
        .company_user.extra_data;
      if (errorData?.length) {
        const idx = findIndex(
          errorData,
          (item: string) => item === ErrorType.UserCredentialAlready
        );
        if (idx !== -1) {
          sanitizedError.message = ErrorType.UserCredentialAlready;
        }
      }
    }
    yield put(createEmployee.failure(sanitizedError));
  }
}

function* createAccessSectorEmployeeSaga({
  payload,
}: ReturnType<typeof createAccessSectorEmployee.request>): Generator {
  try {
    const response: AccessSectorEmployeeResponse = (yield call(
      createAccessSector,
      payload
    )) as AccessSectorEmployeeResponse;
    yield put(createAccessSectorEmployee.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(createAccessSectorEmployee.failure(errors));
  }
}

function* getEmployeeByIdSaga({
  payload,
}: ReturnType<typeof getEmployeeById.request>): Generator {
  try {
    const response: EmployeeByIdResponse = (yield call(
      getById,
      payload
    )) as EmployeeByIdResponse;
    yield put(getEmployeeById.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(getEmployeeById.failure(errors));
  }
}

function* editEmployeeSaga({
  payload,
}: ReturnType<typeof editEmployee.request>): Generator {
  try {
    const response: EmployeeResponse = (yield call(
      edit,
      payload
    )) as EmployeeResponse;
    yield put(editEmployee.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(editEmployee.failure(errors));
  }
}

function* editEmployeePhotoSaga({
  payload,
}: ReturnType<typeof editEmployeePhoto.request>): Generator {
  try {
    const response: EmployeeEditPhotoResponse = (yield call(
      editPhoto,
      payload
    )) as EmployeeEditPhotoResponse;
    yield put(editEmployeePhoto.success(response.data));
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(editEmployeePhoto.failure(errors));
  }
}

function* deleteEmployeeByIdSaga({
  payload,
}: ReturnType<typeof deleteEmployeeById.request>): Generator {
  try {
    yield call(deleteEmployee, payload);
    yield put(deleteEmployeeById.success());
  } catch (err) {
    const errors = err as Error | AxiosError;
    yield put(deleteEmployeeById.failure(errors));
  }
}

export default [
  takeEvery(searchEmployees.request, searchEmployeesSaga),
  takeEvery(createEmployee.request, createEmployeeSaga),
  takeEvery(createAccessSectorEmployee.request, createAccessSectorEmployeeSaga),
  takeEvery(getEmployeeById.request, getEmployeeByIdSaga),
  takeEvery(editEmployee.request, editEmployeeSaga),
  takeEvery(deleteEmployeeById.request, deleteEmployeeByIdSaga),
  takeEvery(editEmployeePhoto.request, editEmployeePhotoSaga),
];
