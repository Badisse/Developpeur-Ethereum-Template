import React from 'react';
import InitAdmin from './InitAdmin';
import useEth from '../../contexts/EthContext/useEth';

function Admin() {
  const { state: { contract } } = useEth();
  return (
    !contract && <InitAdmin />
  );
}

export default Admin;
