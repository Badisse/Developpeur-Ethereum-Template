import React, { useState } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import useEth from '../../contexts/EthContext/useEth';
import { actions } from '../../contexts/EthContext/state';
import Card from '../Utils/Card';
import Button from '../Utils/Button';

function InitAdmin({ children }) {
  const { state: { signer, artifact, account }, dispatch } = useEth();
  const [inputAddress, setInputAddress] = useState('');

  const deployContract = async () => {
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
    const contract = await factory.deploy();
    const isOwner = true;
    dispatch({
      type: actions.loading,
    });
    const workflowStatus = await contract.workflowStatus();
    dispatch({
      type: actions.setContract,
      data: { contract, workflowStatus, isOwner },
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
    if (typeof workflowStatus === 'number') {
      const owner = await contract.owner();
      isOwner = owner.toLowerCase() === account.toLowerCase();
    }
    dispatch({
      type: actions.setContract,
      data: { contract, workflowStatus, isOwner },
    });
  };

  return (
    <div className="flex justify-around w-2/3 h-1/2">
      <Card>
        <>
          <div>
            <div className="text-2xl font-medium">New Voting Session</div>
            <div>Create a voting session</div>
          </div>
          <Button>
            <button
              type="button"
              onClick={deployContract}
            >
              Create
            </button>
          </Button>
        </>
      </Card>
      <Card>
        <>
          <div className="text-2xl font-medium">Manage a voting session</div>
          <input
            type="text"
            className="form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300 border-2
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-cyan-300 focus:outline-none"
            placeholder="Contract Address"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
          />
          <Button>
            <button type="button" onClick={() => getContract()}>Manage</button>
          </Button>
        </>
      </Card>
      {children}
    </div>
  );
}

InitAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InitAdmin;
