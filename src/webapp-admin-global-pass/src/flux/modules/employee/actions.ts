import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { EmployeeError } from '@/models/errors';

import {
  AccessSectorEmployee,
  AccessSectorEmployeePayload,
  Employee,
  EmployeeEditPhoto,
  EmployeeEditPhotoRequest,
  EmployeeEditRequest,
  EmployeePayload,
  EmployeesSearch,
  SearchParam,
} from './types';

export const searchEmployees = createAsyncAction(
  'SEARCH_EMPLOYEES_REQUEST',
  'SEARCH_EMPLOYEES_SUCCESS',
  'SEARCH_EMPLOYEES_ERROR'
)<SearchParam, EmployeesSearch[], Error | AxiosError>();

export const createEmployee = createAsyncAction(
  'CREATE_EMPLOYEES_REQUEST',
  'CREATE_EMPLOYEES_SUCCESS',
  'CREATE_EMPLOYEES_ERROR'
)<EmployeePayload, Employee, Error | AxiosError<EmployeeError>>();

export const createAccessSectorEmployee = createAsyncAction(
  'CREATE_ACCESS_SECTOR_EMPLOYEES_REQUEST',
  'CREATE_ACCESS_SECTOR_EMPLOYEES_SUCCESS',
  'CREATE_ACCESS_SECTOR_EMPLOYEES_ERROR'
)<AccessSectorEmployeePayload, AccessSectorEmployee, Error | AxiosError>();

export const getEmployeeById = createAsyncAction(
  'GET_EMPLOYEE_BY_ID_REQUEST',
  'GET_EMPLOYEE_BY_ID_SUCCESS',
  'GET_EMPLOYEE_BY_ID_ERROR'
)<string, EmployeesSearch, Error | AxiosError>();

export const editEmployee = createAsyncAction(
  'EDIT_EMPLOYEE_REQUEST',
  'EDIT_EMPLOYEE_SUCCESS',
  'EDIT_EMPLOYEE_ERROR'
)<EmployeeEditRequest, Employee, Error | AxiosError>();

export const editEmployeePhoto = createAsyncAction(
  'EDIT_EMPLOYEE_PHOTO_REQUEST',
  'EDIT_EMPLOYEE_PHOTO_SUCCESS',
  'EDIT_EMPLOYEE_PHOTO_ERROR'
)<EmployeeEditPhotoRequest, EmployeeEditPhoto, Error | AxiosError>();

export const clearEditEmployeePhoto = createAction(
  'CLEAR_EDIT_EMPLOYEES_PHOTO'
)();

export const clearEditEmployee = createAction('CLEAR_EDIT_EMPLOYEES')();

export const clearCreateEmployee = createAction('CLEAR_CREATE_EMPLOYEES')();

export const clearSearchEmployee = createAction('CLEAR_SEARCH_EMPLOYEES')();

export const clearCreateAccessSectorEmployee = createAction(
  'CLEAR_CREATE_ACCESS_SECTOR_EMPLOYEES'
)();

export const setSearchParams = createAction('SEARCH_PARAMS')<SearchParam>();

export const deleteEmployeeById = createAsyncAction(
  'DELETE_EMPLOYEE_REQUEST',
  'DELETE_EMPLOYEE_SUCCESS',
  'DELETE_EMPLOYEE_ERROR'
)<string, undefined, Error | AxiosError>();

export const clearDeleteEmployee = createAction('CLEAR_DELETE_EMPLOYEES')();
export const clearGetEmployeeById = createAction('CLEAR_GET_BY_ID_EMPLOYEES')();
