import React from 'react';
import { EthProvider } from './contexts/EthContext';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <EthProvider>
      <div className="bg-blue-800 text-white">
        <MainLayout />
      </div>
    </EthProvider>
  );
}

export default App;
