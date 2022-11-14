import React, { useState } from 'react';
import { ChakraProvider, Button } from '@chakra-ui/react';
import { ethers } from 'ethers';

function App() {
  const [currentAccount, setCurrentAccount] = useState();

  const handleConnect = () => {
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
    setCurrentAccount(undefined);
  };

  return (
    <ChakraProvider>
      {
        currentAccount
          ? <Button colorScheme="blue" onClick={handleDisconnect}>{currentAccount}</Button>
          : <Button colorScheme="blue" onClick={handleConnect}>Connect Wallet</Button>
      }
    </ChakraProvider>
  );
}

export default App;
