import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import useEth from '../contexts/EthContext/useEth';
import Home from './HomeLayout/Home';
import Admin from './AdministratorLayout/Admin';
import Voter from './VoterLayout/Voter';
import UserAddr from './UserAddr';
import { ADMIN_ID, VOTER_ID } from '../constants/roles';

function MainLayout() {
  const { state: { loading, account, userRole } } = useEth();

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <ClipLoader color="#fff" size={150} />
      </div>
    );
  }

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
      {
        userRole && userRole.id === VOTER_ID && <Voter />
      }
    </>
  );
}

export default MainLayout;
