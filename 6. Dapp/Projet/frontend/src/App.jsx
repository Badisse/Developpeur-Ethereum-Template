import React from 'react';
import { ChakraProvider, Button } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div className="text-3xl">Hello badisse</div>
      <Button colorScheme="blue">Button</Button>
    </ChakraProvider>
  );
}

export default App;
