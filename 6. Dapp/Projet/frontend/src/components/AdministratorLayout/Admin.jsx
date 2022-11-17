import React from 'react';
import InitAdmin from './InitAdmin';
import useEth from '../../contexts/EthContext/useEth';
import ManageSession from './ManageSession';

function Admin() {
  const { state: { contract } } = useEth();
  return (
    !contract ? <InitAdmin /> : <ManageSession />
  );
}

export default Admin;
