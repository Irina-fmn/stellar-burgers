import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  return user ? children : <Navigate to='/login' replace />;
};
