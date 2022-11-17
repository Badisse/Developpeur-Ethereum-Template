import React from 'react';
import InitAdmin from './InitAdmin';
import useEth from '../../contexts/EthContext/useEth';
import ManageSession from './ManageSession';

function Admin() {
  const { state: { contract, isOwner, workflowStatus } } = useEth();
  return (
    !isOwner
      ? (
        <InitAdmin>
          {
            contract && (typeof workflowStatus !== 'number') && (<div>Please enter a valid contract address</div>)
          }
          {
            (typeof workflowStatus === 'number') && (<div>You are not the owner</div>)
          }
        </InitAdmin>
      )
      : <ManageSession />
  );
}

export default Admin;
