import { IRequest } from '@/models/iRequest';
import { Role } from '@/types/Guest';

import { Company } from '../company/types';

export type Status = 'pending' | 'invited_pending' | 'approved' | 'rejected';

export type EmployeesSearch = {
  role: Role;
  id: string;
  blocked: boolean;
  access_period: AccessPeriod;
  access_period_end: string;
  access_period_start: string;
  status: Status;
  status_message: string;
  company: Company;
  user: Employee;
  photo?: string;
};

export type EmployeeEdit = {
  blocked: boolean;
  access_period: AccessPeriod;
  extra_data: ExtraDataEdit;
  role: string;
  company?: string;
  email?: string;
};

export type SearchParam = {
  search?: string;
  page?: number;
  companyId: string;
};

export type AccessPeriod = {
  friday: {
    end: string;
    start: string;
  };
  monday: {
    end: string;
    start: string;
  };
  sunday: {
    end: string;
    start: string;
  };
  tuesday: {
    end: string;
    start: string;
  };
  saturday: {
    end: string;
    start: string;
  };
  thursday: {
    end: string;
    start: string;
  };
  wednesday: {
    end: string;
    start: string;
  };
};

export type PeriodDays =
  | 'friday'
  | 'monday'
  | 'sunday'
  | 'tuesday'
  | 'saturday'
  | 'thursday'
  | 'wednesday';

export type EmployeeCreate = {
  username: string;
  role?: string;
  id?: string;
  name?: string;
  credentials?: string;
  registration?: string;
  company?: string;
  photo: File;
  email?: string;
  access_period: AccessPeriod;
  extra_data?: ExtraData;
  password?: string;
};

export type EmployeePayload = {
  data: EmployeeCreate;
  companyId?: string;
};

export type AccessSectorEmployeePayload = {
  access_sector: string;
  access_level: string;
  employee: string;
};

export type EmployeeEditPhotoRequest = {
  photo: File;
  id: string;
  companyId: string;
};

export type EmployeeEditPhoto = {
  photo: string;
};

export type EmployeeEditRequest = {
  data: EmployeeEdit;
  id: string;
};

export type AccessSectorEmployee = {
  id: string;
  access_sector: string;
  access_level: string;
  employee: string;
};

export type ExtraData = {
  name: string;
  credentials: string;
  registration: string;
  company: string;
};

export type ExtraDataEdit = {
  name: string;
  credentials?: string;
  registration: string;
  company: string;
};

export type Employee = {
  id?: string;
  username: string;
  email?: string;
  photo: string;
  extra_data: ExtraData;
};

export interface EmployeeEditPhotoResponse {
  data: EmployeeEditPhoto;
}

export interface EmployeesSearchResponse {
  data: EmployeesSearch[];
}

export interface EmployeeResponse {
  data: Employee;
}

export interface AccessSectorEmployeeResponse {
  data: AccessSectorEmployee;
}

export interface EmployeeByIdResponse {
  data: EmployeesSearch;
}

export interface IEmployees {
  filteredEmployees: IRequest<EmployeesSearch[]>;
  getEmployeeById: IRequest<EmployeesSearch>;
  createEmployee: IRequest<Employee>;
  createAccessSectorEmployee: IRequest<AccessSectorEmployee>;
  editEmployee: IRequest<Employee>;
  editEmployeePhoto: IRequest<EmployeeEditPhoto>;
  deleteEmployee: IRequest<undefined>;
  searchParams?: SearchParam;
}
