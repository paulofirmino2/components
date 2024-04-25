import { useSelector } from '@/flux/selector';
import { RootState } from '@/flux/store';

export const useMyCompanies = () =>
  useSelector((state: RootState) => state.company.myCompanies);

export const useCreateCompany = () =>
  useSelector((state: RootState) => state.company.create);

export const useGetCompanyById = () =>
  useSelector((state: RootState) => state.company.getById);

export const useEditCompany = () =>
  useSelector((state: RootState) => state.company.update);

export const useUserCompanies = () =>
  useSelector((state: RootState) => state.company.userCompanies);
