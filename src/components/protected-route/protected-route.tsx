import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
  children: ReactElement;
  requireAuth?: boolean;
};

export const ProtectedRoute = ({
  requireAuth = false,
  children
}: TProtectedRouteProps) => {
  const user = useSelector((state) => state.user.user);

  if (!requireAuth && user) {
    return <Navigate to='/' replace />;
  }
  if (requireAuth && !user) {
    return <Navigate to='/login' replace />;
  }
  return children;
};
