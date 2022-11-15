import React, { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { Button, Input } from '@chakra-ui/react';
import voting from '../contracts/Voting.json';

function AddVoter({ contractAddress, setVoters }) {
  const [voter, setVoter] = useState('');

  const handleClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, voting.abi, signer);
    const transaction = await contract.addVoter(voter);
    setVoters((curent) => [...curent, voter]);
    console.log(transaction);
  };

  return (
    <>
      <Input
        value={voter}
        onChange={(e) => setVoter(e.target.value)}
      />
      <Button
        onClick={handleClick}
      >
        Add voter
      </Button>
    </>
  );
}

AddVoter.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  setVoters: PropTypes.func.isRequired,
};

export default AddVoter;
