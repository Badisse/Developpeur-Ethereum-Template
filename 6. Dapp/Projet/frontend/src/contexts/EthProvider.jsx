import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import EthContext from './EthContext';

export default function EthProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState();

  const value = useMemo(() => ({
    currentAccount,
    setCurrentAccount,
  }), [currentAccount, setCurrentAccount]);

  return (
    <EthContext.Provider value={value}>
      {children}
    </EthContext.Provider>
  );
}

EthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
