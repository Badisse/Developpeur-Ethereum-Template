import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ConnectButton from './components/ConnectButton';
import EthProvider from './contexts/EthProvider';

function App() {
  return (
    <ChakraProvider>
      <EthProvider>
        <ConnectButton />
      </EthProvider>
    </ChakraProvider>
  );
}

export default App;
