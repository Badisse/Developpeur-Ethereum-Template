import React from 'react';
import InitVoter from './InitVoter';
import useEth from '../../contexts/EthContext/useEth';
import VoterDashboard from './VoterDashboard';

function Voter() {
  const { state: { contract } } = useEth();
  return (
    !contract ? <InitVoter /> : <VoterDashboard />
  );
}

export default Voter;
