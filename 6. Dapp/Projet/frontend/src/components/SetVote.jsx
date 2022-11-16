import React, { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { Button, Input } from '@chakra-ui/react';
import voting from '../contracts/Voting.json';

function SetVote({ currentAccount, contractAddress }) {
  const [voteId, setVoteId] = useState('');

  const checkHasVote = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, voting.abi, provider);
    const voter = await contract.getVoter(currentAccount);
    return voter?.hasVoted;
  };

  const handleClick = async () => {
    const hasVoted = await checkHasVote();
    if (!hasVoted) {
      console.log('Already vote');
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, voting.abi, signer);
    const transaction = await contract.setVote(voteId);
    console.log(transaction);
  };

  return (
    <>
      <Input
        value={voteId}
        onChange={(e) => setVoteId(e.target.value)}
      />
      <Button
        onClick={handleClick}
      >
        Vote
      </Button>
    </>
  );
}

SetVote.propTypes = {
  currentAccount: PropTypes.string.isRequired,
  contractAddress: PropTypes.string.isRequired,
};

export default SetVote;
