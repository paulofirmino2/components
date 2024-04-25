import { useSelector } from '@/flux/selector';
import { RootState } from '@/flux/store';

export const useUser = () => useSelector((state: RootState) => state.user);
