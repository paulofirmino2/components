import { get, patch, post } from '@/apis';

import { Company, CompanyEditRequest } from './types';

export const getMyCompanies = () =>
  get({
    url: '/v2/company/my-companies/',
  });

export const getUserCompany = () =>
  get({
    url: '/company/my-companies/',
  });

export const create = (data: Company) =>
  post({
    url: '/company/company-create/',
    data,
  });

export const getById = (id: string) =>
  get({
    url: `/company/company-detail/${id}/`,
  });

export const update = (request: CompanyEditRequest) =>
  patch({
    url: `/company/company-update/${request.id}/`,
    data: request.data,
  });
