import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import voting from '../contracts/Voting.json';

function ManageVotingSession({ currentAccount, setContractAddress, setAdmin }) {
  const [address, setAddress] = useState('');

  const checkOwnerchip = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, voting.abi, signer);
    const owner = await contract.owner();
    return currentAccount === owner;
  };

  const handleClick = async () => {
    const isOwner = await checkOwnerchip();
    if (!isOwner) {
      console.log('Not the owner');
      return;
    }
    setContractAddress(address);
    setAdmin(true);
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
        Manage a voting session
      </Button>
    </>
  );
}

ManageVotingSession.propTypes = {
  currentAccount: PropTypes.string.isRequired,
  setContractAddress: PropTypes.func.isRequired,
  setAdmin: PropTypes.func.isRequired,
};

export default ManageVotingSession;
