import { IRequest } from '@/models/iRequest';

import { AccessPeriod } from '../employee/types';

export type Status = 'pending' | 'invited_pending' | 'approved' | 'rejected';

export type Role = 'ADMINISTRATOR' | 'COORDINATOR' | 'COMMON' | 'GUEST';

export type Guest = {
  id?: string;
  company: string;
  email: string;
  role: Role;
  created_by?: string;
  data: GuestData;
  created_at?: string;
  accepted?: null | boolean;
  access_period_start: string;
  access_period_end: string;
  access_period: AccessPeriod;
  username: string;
};

export type GuestData = {
  name: string;
  companyName: string;
  locale: string;
};

export interface GetAllGestsResponse {
  data: Guest[];
}

export interface PersistGuestResponse {
  data: Guest;
}

export interface IGuest {
  allGests: IRequest<Guest[]>;
  create: IRequest<Guest>;
  getById: IRequest<Guest>;
}
