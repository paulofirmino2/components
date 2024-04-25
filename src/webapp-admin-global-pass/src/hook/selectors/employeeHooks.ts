import { useSelector } from '@/flux/selector';
import { RootState } from '@/flux/store';

export const useSearchEmployee = () =>
  useSelector((state: RootState) => state.employee.filteredEmployees);

export const useSearchParams = () =>
  useSelector((state: RootState) => state.employee.searchParams);

export const useCreateEmployee = () =>
  useSelector((state: RootState) => state.employee.createEmployee);

export const useCreateAccessSectorEmployee = () =>
  useSelector((state: RootState) => state.employee.createAccessSectorEmployee);

export const useGetEmployeeById = () =>
  useSelector((state: RootState) => state.employee.getEmployeeById);

export const useEditEmployee = () =>
  useSelector((state: RootState) => state.employee.editEmployee);

export const useDeleteEmployee = () =>
  useSelector((state: RootState) => state.employee.deleteEmployee);
