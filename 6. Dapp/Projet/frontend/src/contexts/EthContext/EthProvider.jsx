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
import artifact from '../../contracts/Voting.json';

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let account;
    provider.send('eth_requestAccounts', [])
      .then((accnt) => {
        if (accnt.length > 0) [account] = accnt;
      })
      .catch((e) => console.log(e));
    const networkID = await provider.getNetwork();
    dispatch({
      type: actions.init,
      data: {
        artifact, provider, signer, account, networkID,
      },
    });
  }, []);

  useEffect(() => {
    const events = ['chainChanged', 'accountsChanged'];
    const handleChange = () => {
      init();
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={
      useMemo(() => ({
        state, dispatch, init,
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
