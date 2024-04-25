import { IRequest } from '@/models/iRequest';
import { Role } from '@/types/Guest';

import { AccessPeriod, Employee } from '../employee/types';

export type Company = {
  id?: string;
  name: string;
  fantasy_name: string;
  company_email: string;
  cnpj: string;
  blocked?: boolean;
  created_at?: string;
  updated_at?: string;
  closed_at?: string;
  worker_period: AccessPeriod;
  responsible: string;
};

export type CompanyUser = {
  id?: string;
  name: string;
  fantasy_name: string;
  company_email: string;
  cnpj: string;
  blocked?: boolean;
  created_at?: string;
  updated_at?: string;
  closed_at?: string;
  worker_period: AccessPeriod;
  responsible: string;
  user: Employee;
  company: Company;
  role?: Role;
};

export type CompanyEdit = {
  fantasy_name: string;
  company_email: string;
  blocked?: boolean;
  worker_period: AccessPeriod;
  responsible: string;
};

export type CompanyEditRequest = {
  data: CompanyEdit;
  id: string;
};

export interface MyCompaniesResponse {
  data: Company[];
}

export interface UserCompaniesResponse {
  data: CompanyUser[];
}

export interface PersistCompanyResponse {
  data: Company;
}

export interface GetCompanyByIdResponse {
  data: Company[];
}

export interface ICompany {
  userCompanies: IRequest<CompanyUser[]>;
  myCompanies: IRequest<Company[]>;
  create: IRequest<Company>;
  update: IRequest<Company>;
  getById: IRequest<Company>;
}
