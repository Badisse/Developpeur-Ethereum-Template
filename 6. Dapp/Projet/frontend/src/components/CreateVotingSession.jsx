import React from 'react';
import { ethers } from 'ethers';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import voting from '../contracts/Voting.json';

function CreateVotingSession({ setContractAddress, setAdmin }) {
  const deployContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const factory = new ethers.ContractFactory(voting.abi, voting.bytecode, signer);
    const contract = await factory.deploy();
    setContractAddress(contract.address);
    setAdmin(true);
    console.log(contract.address);
  };

  return (
    <Button
      colorScheme="blue"
      onClick={deployContract}
    >
      Create a voting session
    </Button>
  );
}

CreateVotingSession.propTypes = {
  setContractAddress: PropTypes.func.isRequired,
  setAdmin: PropTypes.func.isRequired,
};

export default CreateVotingSession;
