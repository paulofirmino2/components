import { get, post } from '@/apis';

import { Guest } from './types';

export const getAll = () =>
  get({
    url: '/company/company-invite/list/',
  });

export const create = (data: Guest) =>
  post({
    url: '/company/company-invite/create/',
    data,
  });

export const getById = (id: string) =>
  get({
    url: `/company/company-invite/retrive/${id}`,
  });
