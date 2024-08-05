import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const WithAuth = ({ children }: { children: ReactNode }): JSX.Element => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    // Redirect to login page
    navigate('/login');
    return <div>Please log in to access this page.</div>;
  }

  return <>{children}</>;
};

export default WithAuth;
