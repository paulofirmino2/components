import { Role } from '@/types/Guest';

import { ExtraData } from '../employee/types';

export type Employee = {
  id: string;
  email: string;
  is_active: true;
  is_staff: true;
  username: string;
};

export type EmployeeMe = {
  id: string;
  email: string;
  is_superuser: string;
  username: string;
  photo: string;
  extra_data: ExtraData;
  role?: Role;
};

export interface UserResponse {
  data: EmployeeMe;
}
