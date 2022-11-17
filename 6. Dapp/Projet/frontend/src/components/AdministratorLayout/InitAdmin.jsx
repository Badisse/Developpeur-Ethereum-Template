import React, { useState } from 'react';
import { ethers } from 'ethers';
import useEth from '../../contexts/EthContext/useEth';
import { actions } from '../../contexts/EthContext/state';

function InitAdmin() {
  const { state: { signer, artifact }, dispatch } = useEth();
  const [inputAddress, setInputAddress] = useState('');

  const deployContract = async () => {
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
    const contract = await factory.deploy();
    dispatch({
      type: actions.loading,
    });
    const workflowStatus = await contract.workflowStatus();
    dispatch({
      type: actions.setContract,
      data: { contract, workflowStatus },
    });
  };

  // TODO: Check if owner
  const getContract = async () => {
    const contract = new ethers.Contract(inputAddress, artifact.abi, signer);
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
      <div>
        <div>Create a voting session</div>
        <button type="button" onClick={deployContract}>Create</button>
      </div>
      <div>
        <div>Manage a voting session</div>
        <input
          type="text"
          className="text-gray-800"
          placeholder="Contract Address"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
        />
        <button type="button" onClick={() => getContract()}>Manage</button>
      </div>
    </div>
  );
}

export default InitAdmin;
