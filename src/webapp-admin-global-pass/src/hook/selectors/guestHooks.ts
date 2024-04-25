import { useSelector } from '@/flux/selector';
import { RootState } from '@/flux/store';

export const useAllGuests = () =>
  useSelector((state: RootState) => state.guest.allGests);

export const useCreateGuest = () =>
  useSelector((state: RootState) => state.guest.create);

export const useGetGuestById = () =>
  useSelector((state: RootState) => state.guest.getById);
