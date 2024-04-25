import { get } from '@/apis';

export const getUser = () =>
  get({
    url: '/user/me/',
  });
