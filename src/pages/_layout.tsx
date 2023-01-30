import Header from '../components/Header';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={'loading...'}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout;