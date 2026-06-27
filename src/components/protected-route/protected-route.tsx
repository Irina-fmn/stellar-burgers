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
  const location = useLocation();

  if (!requireAuth && user) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }
  if (requireAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};
