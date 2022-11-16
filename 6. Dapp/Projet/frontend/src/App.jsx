import React from 'react';
import { EthProvider } from './contexts/EthContext';
import Home from './components/HomeLayout/Home';

function App() {
  return (
    <EthProvider>
      <div className="bg-blue-800 text-white">
        <Home />
      </div>
    </EthProvider>
  );
}

export default App;
