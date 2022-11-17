import React from 'react';
import InitVoter from './InitVoter';
import useEth from '../../contexts/EthContext/useEth';

function Voter() {
  const { state: { contract } } = useEth();
  return (
    !contract ? <InitVoter /> : undefined
  );
}

export default Voter;
