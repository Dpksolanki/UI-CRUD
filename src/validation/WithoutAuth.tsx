import React, { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const WithoutAuth = ({ children }: { children: ReactNode }): JSX.Element => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default WithoutAuth;
