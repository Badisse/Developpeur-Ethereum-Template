import React from 'react';
import { ethers } from 'ethers';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function ConnectButton({
  currentAccount,
  setCurrentAccount,
  setAdmin,
  setVoter,
}) {
  const handleConnect = async () => {
    console.log('Connect');
    if (!window.ethereum) {
      console.log('Install MetaMask');
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  const handleDisconnect = () => {
    console.log('Disconnect');
    setCurrentAccount(undefined);
    setAdmin(false);
    setVoter(false);
  };

  return (
    <Button
      colorScheme="blue"
      onClick={currentAccount ? handleDisconnect : handleConnect}
    >
      {currentAccount || 'Connect Wallet'}
    </Button>
  );
}

ConnectButton.propTypes = {
  currentAccount: PropTypes.string.isRequired,
  setCurrentAccount: PropTypes.func.isRequired,
  setAdmin: PropTypes.func.isRequired,
  setVoter: PropTypes.func.isRequired,
};

export default ConnectButton;
