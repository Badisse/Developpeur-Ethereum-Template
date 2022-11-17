import React, { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import useEth from '../../contexts/EthContext/useEth';
import { actions } from '../../contexts/EthContext/state';

function InitVoter({ children }) {
  const { state: { signer, artifact, account }, dispatch } = useEth();
  const [inputAddress, setInputAddress] = useState('');

  const getContract = async (contractAddress) => {
    dispatch({
      type: actions.loading,
    });
    const contract = new ethers.Contract(contractAddress, artifact.abi, signer);
    let workflowStatus = null;
    let voter = null;
    try {
      workflowStatus = await contract.workflowStatus();
    } catch (err) {
      console.log(err);
    }
    if (workflowStatus) {
      try {
        voter = await contract.getVoter(account);
      } catch (err) {
        console.log(err);
      }
    }
    dispatch({
      type: actions.setContract,
      data: { contract, workflowStatus, voter },
    });
  };

  return (
    <div className="h-screen">
      <div>Access a voting session</div>
      <input
        type="text"
        className="text-gray-800"
        placeholder="Contract Address"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      <button type="button" onClick={() => getContract(inputAddress)}>Access</button>
      {children}
    </div>
  );
}

InitVoter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InitVoter;
