import { Action, createReducer } from 'typesafe-actions';

import { RequestStatus } from '@/models/iRequest';

import {
  clearCreateCompany,
  clearEditCompany,
  clearGetCompanyById,
  clearMyCompanies,
  clearUserCompany,
  createCompany,
  editCompany,
  getCompanyById,
  getUserCompany,
  myCompanies,
} from './actions';
import { ICompany } from './types';

const initialState: ICompany = {
  myCompanies: { data: null, message: null, status: RequestStatus.idle },
  create: { data: null, message: null, status: RequestStatus.idle },
  userCompanies: { data: null, message: null, status: RequestStatus.idle },
  update: { data: null, message: null, status: RequestStatus.idle },
  getById: { data: null, message: null, status: RequestStatus.idle },
};

const companyReducer = createReducer<ICompany, Action>(initialState)
  .handleAction(myCompanies.request, state => ({
    ...state,
    myCompanies: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(myCompanies.success, (state, action) => ({
    ...state,
    myCompanies: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(myCompanies.failure, (state, action) => ({
    ...state,
    myCompanies: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(createCompany.request, state => ({
    ...state,
    create: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(createCompany.success, (state, action) => ({
    ...state,
    create: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(createCompany.failure, (state, action) => ({
    ...state,
    create: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(getCompanyById.request, state => ({
    ...state,
    getById: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(getCompanyById.success, (state, action) => ({
    ...state,
    getById: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(getCompanyById.failure, (state, action) => ({
    ...state,
    getById: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))

  .handleAction(editCompany.request, state => ({
    ...state,
    update: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(editCompany.success, (state, action) => ({
    ...state,
    update: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(editCompany.failure, (state, action) => ({
    ...state,
    update: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(clearMyCompanies, state => ({
    ...state,
    myCompanies: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }))
  .handleAction(clearCreateCompany, state => ({
    ...state,
    create: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }))
  .handleAction(clearGetCompanyById, state => ({
    ...state,
    getById: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }))
  .handleAction(clearEditCompany, state => ({
    ...state,
    update: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }))
  .handleAction(getUserCompany.request, state => ({
    ...state,
    userCompanies: {
      data: null,
      message: null,
      status: RequestStatus.fetching,
    },
  }))
  .handleAction(getUserCompany.success, (state, action) => ({
    ...state,
    userCompanies: {
      data: action.payload,
      message: null,
      status: RequestStatus.success,
    },
  }))
  .handleAction(getUserCompany.failure, (state, action) => ({
    ...state,
    userCompanies: {
      data: null,
      message: action.payload.message,
      status: RequestStatus.error,
    },
  }))
  .handleAction(clearUserCompany, state => ({
    ...state,
    update: {
      data: null,
      message: null,
      status: RequestStatus.idle,
    },
  }));

export default companyReducer;
