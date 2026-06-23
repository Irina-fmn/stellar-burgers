import { ReactElement } from 'react';

type TProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: TProtectedRouteProps) => children;
