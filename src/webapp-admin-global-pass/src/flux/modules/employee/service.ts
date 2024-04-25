import { del, get, patch, post } from '@/apis';

import {
  AccessSectorEmployeePayload,
  EmployeeEditPhotoRequest,
  EmployeeEditRequest,
  EmployeePayload,
  SearchParam,
} from './types';

export const search = (searchParam: SearchParam) => {
  let params = searchParam?.page ? `page=${searchParam.page}&` : '';

  params = searchParam?.search
    ? `search/?search_params=${searchParam.search}`
    : '';

  return get({
    url: `company/company-users/${searchParam.companyId}/${params}`,
  });
};

export const create = (employeePayload: EmployeePayload) => {
  const formData = new FormData();
  formData.append('username', employeePayload.data.username);
  formData.append('role', employeePayload.data.role || '');
  formData.append('photo', employeePayload.data.photo);
  formData.append('email', employeePayload.data.email || '');
  formData.append('password', employeePayload.data.password || '');
  formData.append(
    'access_period',
    JSON.stringify(employeePayload.data.access_period)
  );
  formData.append(
    'extra_data',
    JSON.stringify({
      name: employeePayload.data.name,
      credentials: employeePayload.data.credentials,
      registration: employeePayload.data.registration,
      company: employeePayload.data.company,
    })
  );

  return post({
    url: `company/company-user/${employeePayload.data.company || ''}/`,
    data: formData,
  });
};

export const createAccessSector = (data: AccessSectorEmployeePayload) =>
  post({
    url: 'employee/access-sector-employee/create/',
    data,
  });

export const getById = (id: string) =>
  get({
    url: `company/company-user/detail/${id}`,
  });

export const edit = (request: EmployeeEditRequest) =>
  patch({
    url: `company/company-user/detail/${request.id}/`,
    data: request.data,
  });

export const editPhoto = (request: EmployeeEditPhotoRequest) => {
  const formData = new FormData();
  formData.append('photo', request.photo);

  return patch({
    url: `user/temp/detail/${request.id}/${request.companyId}/`,
    data: formData,
  });
};

export const deleteEmployee = (id: string) =>
  del({
    url: `company/company-users/${id}/remove/`,
  });
