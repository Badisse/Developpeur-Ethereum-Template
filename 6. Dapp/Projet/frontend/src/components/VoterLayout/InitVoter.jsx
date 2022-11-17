import React, { useState } from 'react';
import { ethers } from 'ethers';
import useEth from '../../contexts/EthContext/useEth';
import { actions } from '../../contexts/EthContext/state';

function InitVoter() {
  const { state: { signer, artifact }, dispatch } = useEth();
  const [inputAddress, setInputAddress] = useState('');

  // TODO: check if voter
  const getContract = async (contractAddress) => {
    dispatch({
      type: actions.loading,
    });
    const contract = new ethers.Contract(contractAddress, artifact.abi, signer);
    try {
      const workflowStatus = await contract.workflowStatus();
      dispatch({
        type: actions.setContract,
        data: { contract, workflowStatus },
      });
    } catch (err) {
      console.log('not a contract address');
    }
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
    </div>
  );
}

export default InitVoter;
