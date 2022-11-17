import React, { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import useEth from '../../contexts/EthContext/useEth';
import { actions } from '../../contexts/EthContext/state';

function InitAdmin({ children }) {
  const { state: { signer, artifact, account }, dispatch } = useEth();
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

  const getContract = async () => {
    dispatch({
      type: actions.loading,
    });
    const contract = new ethers.Contract(inputAddress, artifact.abi, signer);
    let workflowStatus = null;
    let isOwner = null;
    try {
      workflowStatus = await contract.workflowStatus();
    } catch (err) {
      console.log(err);
    }
    if (workflowStatus) {
      const owner = await contract.owner();
      isOwner = owner === account;
    }
    dispatch({
      type: actions.setContract,
      data: { contract, workflowStatus, isOwner },
    });
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
      {children}
    </div>
  );
}

InitAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InitAdmin;
