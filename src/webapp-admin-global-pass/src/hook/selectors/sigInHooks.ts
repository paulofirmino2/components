import { useSelector } from '@/flux/selector';
import { RootState } from '@/flux/store';

export const useSigIn = () => useSelector((state: RootState) => state.sigIn);
