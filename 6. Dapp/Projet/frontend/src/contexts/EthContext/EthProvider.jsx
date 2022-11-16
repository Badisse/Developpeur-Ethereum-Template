import React, {
  useReducer,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import EthContext from './EthContext';
import { reducer, actions, initialState } from './state';
import voting from '../../contracts/Voting.json';

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      const networkID = await provider.getNetwork();
      dispatch({
        type: actions.init,
        data: {
          artifact, provider, accounts, networkID,
        },
      });
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = voting;
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ['chainChanged', 'accountsChanged'];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={
      useMemo(() => ({
        state, dispatch,
      }), [state, dispatch])
    }
    >
      {children}
    </EthContext.Provider>
  );
}

EthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EthProvider;
