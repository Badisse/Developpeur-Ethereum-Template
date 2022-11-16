import React, { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { Button, Input } from '@chakra-ui/react';
import voting from '../contracts/Voting.json';

function GetProposal({ contractAddress }) {
  const [proposalId, setProposalId] = useState();
  const [proposal, setProposal] = useState();

  const handleClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, voting.abi, signer);
    const newProposal = await contract.getOneProposal(proposalId);
    console.log(newProposal);
    setProposal(newProposal);
  };

  return (
    <>
      <Input
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
      />
      <Button
        onClick={handleClick}
      >
        Get Proposal
      </Button>
      {
        proposal && <h3>{proposal.description}</h3>
      }
    </>
  );
}

GetProposal.propTypes = {
  contractAddress: PropTypes.string.isRequired,
};

export default GetProposal;
