import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useRedux';

interface ProtectedRouteElementProps {
  children: ReactNode;
  onlyUnauth?: boolean;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({ children, onlyUnauth = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (onlyUnauth) {
    if (isAuthenticated || user) {
      const from = (location.state as any)?.from || { pathname: '/' };
      return <Navigate to={from} replace />;
    }
    return <>{children}</>;
  }

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
