import React, { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { ethers } from 'ethers';
import EthContext from '../contexts/EthContext';

export default function ConnectButton() {
  const ethContext = useContext(EthContext);

  const handleConnect = () => {
    console.log('Connect');
    if (!window.ethereum) {
      console.log('Install MetaMask');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    provider.send('eth_requestAccounts', [])
      .then((accounts) => {
        if (accounts.length > 0) ethContext.setCurrentAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  const handleDisconnect = () => {
    console.log('Disconnect');
    ethContext.setCurrentAccount(undefined);
  };

  return (
    <Button
      colorScheme="blue"
      onClick={ethContext.currentAccount ? handleDisconnect : handleConnect}
    >
      {ethContext.currentAccount || 'Connect Wallet'}
    </Button>
  );
}
