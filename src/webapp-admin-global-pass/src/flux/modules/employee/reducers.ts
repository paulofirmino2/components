import { Action, createReducer } from 'typesafe-actions';

import { RequestStatus } from '@/models/iRequest';

import {
  clearCreateAccessSectorEmployee,
  clearCreateEmployee,
  clearDeleteEmployee,
  clearEditEmployee,
  clearEditEmployeePhoto,
  clearGetEmployeeById,
  clearSearchEmployee,
  createAccessSectorEmployee as createAccessSectorEmployeeAction,
  createEmployee as createEmployeeAction,
  deleteEmployeeById,
  editEmployee as editEmployeeAction,
  editEmployeePhoto as editEmployeePhotoAction,
  getEmployeeById as getEmployeeByIdAction,
  searchEmployees,
  setSearchParams,
} from './actions';
import { IEmployees } from './types';

const initialState: IEmployees = {
  getEmployeeById: { data: null, message: null, status: RequestStatus.idle },
  filteredEmployees: { data: null, message: null, status: RequestStatus.idle },
  editEmployee: { data: null, message: null, status: RequestStatus.idle },
  createEmployee: { data: null, message: null, status: RequestStatus.idle },
  editEmployeePhoto: { data: null, message: null, status: RequestStatus.idle },
  deleteEmployee: { data: null, message: null, status: RequestStatus.idle },
  createAccessSectorEmployee: {
    data: null,
    message: null,
    status: RequestStatus.idle,
  },
  searchParams: undefined,
};

const employeeReducer = createReducer<IEmployees, Action>(initialState)
  .handleAction(searchEmployees.request, state => ({
    ...state,
    filteredEmployees: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(searchEmployees.success, (state, action) => ({
    ...state,
    filteredEmployees: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(searchEmployees.failure, (state, action) => ({
    ...state,
    filteredEmployees: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(clearSearchEmployee, state => ({
    ...state,
    filteredEmployees: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }))
  .handleAction(setSearchParams, (state, action) => ({
    ...state,
    searchParams: action.payload,
  }))
  .handleAction(createEmployeeAction.request, state => ({
    ...state,
    createEmployee: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(createEmployeeAction.success, (state, action) => ({
    ...state,
    createEmployee: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(createEmployeeAction.failure, (state, action) => ({
    ...state,
    createEmployee: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(createAccessSectorEmployeeAction.request, state => ({
    ...state,
    createAccessSectorEmployee: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(createAccessSectorEmployeeAction.success, (state, action) => ({
    ...state,
    createAccessSectorEmployee: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(createAccessSectorEmployeeAction.failure, (state, action) => ({
    ...state,
    createAccessSectorEmployee: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(clearCreateAccessSectorEmployee, state => ({
    ...state,
    createAccessSectorEmployee: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }))
  .handleAction(clearCreateEmployee, state => ({
    ...state,
    createEmployee: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }))
  .handleAction(getEmployeeByIdAction.request, state => ({
    ...state,
    getEmployeeById: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(getEmployeeByIdAction.success, (state, action) => ({
    ...state,
    getEmployeeById: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(getEmployeeByIdAction.failure, (state, action) => ({
    ...state,
    getEmployeeById: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(editEmployeeAction.request, state => ({
    ...state,
    editEmployee: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(editEmployeeAction.success, (state, action) => ({
    ...state,
    editEmployee: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(editEmployeeAction.failure, (state, action) => ({
    ...state,
    editEmployee: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(clearEditEmployee, state => ({
    ...state,
    editEmployee: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }))
  .handleAction(editEmployeePhotoAction.request, state => ({
    ...state,
    editEmployeePhoto: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(editEmployeePhotoAction.success, (state, action) => ({
    ...state,
    editEmployeePhoto: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(editEmployeePhotoAction.failure, (state, action) => ({
    ...state,
    editEmployeePhoto: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(clearEditEmployeePhoto, state => ({
    ...state,
    editEmployeePhoto: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }))
  .handleAction(deleteEmployeeById.request, state => ({
    ...state,
    deleteEmployee: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(deleteEmployeeById.success, state => ({
    ...state,
    deleteEmployee: {
      data: null,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(deleteEmployeeById.failure, (state, action) => ({
    ...state,
    deleteEmployee: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(clearDeleteEmployee, state => ({
    ...state,
    deleteEmployee: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }))
  .handleAction(clearGetEmployeeById, state => ({
    ...state,
    getEmployeeById: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }));

export default employeeReducer;
