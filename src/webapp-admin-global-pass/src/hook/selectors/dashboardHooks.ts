import { useSelector } from '@/flux/selector';
import { RootState } from '@/flux/store';

export const useDashboard = () =>
  useSelector((state: RootState) => state.dashboard);
