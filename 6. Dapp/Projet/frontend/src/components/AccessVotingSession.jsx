import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import voting from '../contracts/Voting.json';

function AccessVotingSession({ currentAccount, setContractAddress, setVoter }) {
  const [address, setAddress] = useState('');

  const checkVoter = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, voting.abi, signer);
    console.log(currentAccount);
    const voter = await contract.getVoter(currentAccount);
    console.log(voter);
    return voter?.isRegistered;
  };

  const handleClick = async () => {
    const isVoter = await checkVoter();
    if (!isVoter) {
      console.log('Not a voter');
      return;
    }
    setContractAddress(address);
    setVoter(true);
  };

  return (
    <>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button
        colorScheme="blue"
        onClick={handleClick}
      >
        Access a voting session
      </Button>
    </>
  );
}

AccessVotingSession.propTypes = {
  currentAccount: PropTypes.string.isRequired,
  setContractAddress: PropTypes.func.isRequired,
  setVoter: PropTypes.func.isRequired,
};

export default AccessVotingSession;
