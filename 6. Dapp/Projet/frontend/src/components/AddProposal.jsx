import React, { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { Button, Input } from '@chakra-ui/react';
import voting from '../contracts/Voting.json';

function AddProposal({ contractAddress }) {
  const [proposal, setProposal] = useState('');

  const handleClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, voting.abi, signer);
    const transaction = await contract.addProposal(proposal);
    console.log(transaction);
  };

  return (
    <>
      <Input
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
      />
      <Button
        onClick={handleClick}
      >
        Add proposal
      </Button>
    </>
  );
}

AddProposal.propTypes = {
  contractAddress: PropTypes.string.isRequired,
};

export default AddProposal;
