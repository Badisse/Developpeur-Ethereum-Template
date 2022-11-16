import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { EthProvider } from './contexts/EthContext';

function App() {
  return (
    <ChakraProvider>
      <EthProvider>
        <p>test</p>
      </EthProvider>
    </ChakraProvider>
  );
}

export default App;
