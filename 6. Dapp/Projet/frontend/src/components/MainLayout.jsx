import React from 'react';
import useEth from '../contexts/EthContext/useEth';
import Home from './HomeLayout/Home';
import Admin from './AdministratorLayout/Admin';
import UserAddr from './UserAddr';
import { ADMIN_ID } from '../constants/roles';

function MainLayout() {
  const { state: { account, userRole } } = useEth();

  return (
    <>
      {
        account && <UserAddr />
      }
      {
        !userRole && <Home />
      }
      {
        userRole && userRole.id === ADMIN_ID && <Admin />
      }
    </>
  );
}

export default MainLayout;
