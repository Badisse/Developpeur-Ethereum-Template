import React from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import voting from '../contracts/Voting.json';

function NextWorkflowStatus({ contractAddress, setWorkflowStatus }) {
  const handleClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, voting.abi, signer);
    const workflowStatus = await contract.workflowStatus();
    let transaction;
    switch (workflowStatus) {
      case 0:
        transaction = await contract.startProposalsRegistering();
        break;
      case 1:
        transaction = await contract.endProposalsRegistering();
        break;
      case 2:
        transaction = await contract.startVotingSession();
        break;
      case 3:
        transaction = await contract.endVotingSession();
        break;
      default:
        break;
    }
    setWorkflowStatus(workflowStatus + 1);
    console.log(workflowStatus);
    console.log(transaction);
  };

  return (
    <Button
      onClick={handleClick}
    >
      Next Workflow Status
    </Button>
  );
}

NextWorkflowStatus.propTypes = {
  contractAddress: PropTypes.string.isRequired,
  setWorkflowStatus: PropTypes.func.isRequired,
};

export default NextWorkflowStatus;
