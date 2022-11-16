import React, { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import { Button, Input } from '@chakra-ui/react';
import voting from '../contracts/Voting.json';

function GetVoter({ contractAddress }) {
  const [voterAddress, setVoterAddress] = useState();
  const [voter, setVoter] = useState();

  const handleClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, voting.abi, signer);
    setVoter(await contract.getVoter(voterAddress));
  };

  return (
    <>
      <Input
        value={voterAddress}
        onChange={(e) => setVoterAddress(e.target.value)}
      />
      <Button
        onClick={handleClick}
      >
        Get Voter
      </Button>
      <ul>
        {
          voter?.map((item) => <li key={item}>{item}</li>)
        }
      </ul>
    </>
  );
}

GetVoter.propTypes = {
  contractAddress: PropTypes.string.isRequired,
};

export default GetVoter;
