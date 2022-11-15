import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function ManageVotingSession({ setContractAddress }) {
  const [address, setAddress] = useState('');

  const handleClick = () => {
    setContractAddress(address);
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
  setContractAddress: PropTypes.func.isRequired,
};

export default ManageVotingSession;
