import React, { useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import WORKFLOW_STATUS, { WORKFLOW_STATUS_STRING } from '../../constants/workflowStatus';
import { actions } from '../../contexts/EthContext/state';

function ManageSession() {
  const { state: { workflowStatus, contract, provider }, dispatch } = useEth();
  const [voterAddress, setVoterAddress] = useState();

  const updateWorkflowStatus = async () => {
    dispatch({
      type: actions.loading,
    });
    let transaction;
    switch (workflowStatus) {
      case WORKFLOW_STATUS.registeringVoters:
        transaction = await contract.startProposalsRegistering();
        break;
      case WORKFLOW_STATUS.proposalsRegistrationStarted:
        transaction = await contract.endProposalsRegistering();
        break;
      case WORKFLOW_STATUS.proposalsRegistrationEnded:
        transaction = await contract.startVotingSession();
        break;
      case WORKFLOW_STATUS.votingSessionStarted:
        transaction = await contract.endVotingSession();
        break;
      default:
        break;
    }
    provider.waitForTransaction(transaction.hash).then(async () => {
      const newWorkflowStatus = await contract.workflowStatus();
      dispatch({
        type: actions.updateWorkflowStatus,
        workflowStatus: newWorkflowStatus,
      });
    });
  };

  return (
    <div className="h-screen">
      {workflowStatus !== WORKFLOW_STATUS.votingSessionEnded
        && (
          <div>
            <div>
              Current Workflow Status:
              {WORKFLOW_STATUS_STRING[workflowStatus]}
            </div>
            <div>Update Workflow Status</div>
            <button
              type="button"
              className="border"
              onClick={updateWorkflowStatus}
            >
              Update
            </button>
          </div>
        )}
      {workflowStatus === WORKFLOW_STATUS.registeringVoters
        && (
          <div>
            <div>
              Add voter
            </div>
            <input
              type="text"
              onChange={
                (e) => setVoterAddress(e.target.value)
              }
              value={voterAddress}
            />
            <button
              type="button"
              className="border"
            >
              Add
            </button>
          </div>
        )}
    </div>
  );
}

export default ManageSession;
