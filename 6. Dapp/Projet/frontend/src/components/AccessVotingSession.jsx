import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function AccessVotingSession({ setContractAddress, setVoter }) {
  const [address, setAddress] = useState('');

  const handleClick = () => {
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
  setContractAddress: PropTypes.func.isRequired,
  setVoter: PropTypes.func.isRequired,
};

export default AccessVotingSession;
