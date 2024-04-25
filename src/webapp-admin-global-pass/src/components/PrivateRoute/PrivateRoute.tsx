import { FC, ReactElement, useEffect, useState } from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';

import { useUser } from '@/hook/selectors/userHooks';
import { isAuthenticated } from '@/utils/services/auth';

type Props = {
  children: ReactElement | null;
} & RouteProps;

export const PrivateRoute: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  const { data: userData } = useUser();

  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    if (userData?.is_superuser && pathname.includes('/empresa')) {
      setIsAuthorized(false);
    }
  }, [userData]);

  if (!isAuthenticated() || !isAuthorized) {
    return <Navigate replace to="/" />;
  }

  return children;
};
