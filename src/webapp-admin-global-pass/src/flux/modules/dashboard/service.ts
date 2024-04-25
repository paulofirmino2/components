import { get } from '@/apis';

export const getInfo = () =>
  get({
    url: '/dashboard/',
  });
