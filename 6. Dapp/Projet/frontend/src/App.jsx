import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { EthProvider } from './contexts/EthContext';
import Home from './components/HomeLayout/Home';

function App() {
  return (
    <ChakraProvider>
      <EthProvider>
        <div className="bg-blue-800 text-white">
          <Home />
        </div>
      </EthProvider>
    </ChakraProvider>
  );
}

export default App;
