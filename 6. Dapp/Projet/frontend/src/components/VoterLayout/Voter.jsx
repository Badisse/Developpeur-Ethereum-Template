import React from 'react';
import InitVoter from './InitVoter';
import useEth from '../../contexts/EthContext/useEth';
import VoterDashboard from './VoterDashboard';

function Voter() {
  const { state: { contract, workflowStatus, voter } } = useEth();
  console.log(contract && !workflowStatus);
  return (
    !voter
      ? (
        <InitVoter>
          {
            contract && !!workflowStatus && (<div>Please enter a valid contract address</div>)
          }
          {
            (typeof workflowStatus === 'number') && (<div>You are not registered</div>)
          }
        </InitVoter>
      )
      : <VoterDashboard />
  );
}

export default Voter;
