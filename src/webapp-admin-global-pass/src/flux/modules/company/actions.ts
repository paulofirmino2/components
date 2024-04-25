import { AxiosError } from 'axios';
import { createAction, createAsyncAction } from 'typesafe-actions';

import { Company, CompanyEditRequest, CompanyUser } from './types';

export const myCompanies = createAsyncAction(
  'MY_COMPANIES_REQUEST',
  'MY_COMPANIES_SUCCESS',
  'MY_COMPANIES_ERROR'
)<undefined, Company[], Error | AxiosError>();

export const getUserCompany = createAsyncAction(
  'GET_COMPANY_USER_REQUEST',
  'GET_COMPANY_USER_SUCCESS',
  'GET_COMPANY_USER_ERROR'
)<undefined, CompanyUser[], Error | AxiosError>();

export const createCompany = createAsyncAction(
  'CREATE_COMPANY_REQUEST',
  'CREATE_COMPANY_SUCCESS',
  'CREATE_COMPANY_ERROR'
)<Company, Company, Error | AxiosError>();

export const editCompany = createAsyncAction(
  'EDIT_COMPANY_REQUEST',
  'EDIT_COMPANY_SUCCESS',
  'EDIT_COMPANY_ERROR'
)<CompanyEditRequest, Company, Error | AxiosError>();

export const getCompanyById = createAsyncAction(
  'GET_COMPANY_BY_ID_REQUEST',
  'GET_COMPANY_BY_ID_SUCCESS',
  'GET_COMPANY_BY_ID_ERROR'
)<string, Company, Error | AxiosError>();

export const clearMyCompanies = createAction('CLEAR_MY_COMPANIES')();

export const clearEditCompany = createAction('CLEAR_EDIT_COMPANY')();

export const clearCreateCompany = createAction('CLEAR_CREATE_COMPANY')();

export const clearGetCompanyById = createAction('CLEAR_GET_COMPANY_BY_ID')();

export const clearUserCompany = createAction('CLEAR_USER_COMPANY')();
