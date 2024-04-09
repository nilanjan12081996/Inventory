import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const OutsideLayout = () => {
  // Checking if an user already logged in
  const token = sessionStorage.getItem('adminToken');
  if (token) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <>
      <Suspense fallback={'loading ...'}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default OutsideLayout;
