import React from 'react';
import useEth from '../../contexts/EthContext/useEth';
import WORKFLOW_STATUS, { WORKFLOW_STATUS_STRING } from '../../constants/workflowStatus';
import { actions } from '../../contexts/EthContext/state';

function ManageSession() {
  const { state: { workflowStatus, contract }, dispatch } = useEth();

  const updateWorkflowStatus = async () => {
    dispatch({
      type: actions.loading,
    });
    switch (workflowStatus) {
      case WORKFLOW_STATUS.registeringVoters:
        await contract.startProposalsRegistering();
        break;
      case WORKFLOW_STATUS.proposalsRegistrationStarted:
        await contract.endProposalsRegistering();
        break;
      case WORKFLOW_STATUS.proposalsRegistrationEnded:
        await contract.startVotingSession();
        break;
      case WORKFLOW_STATUS.votingSessionStarted:
        await contract.endVotingSession();
        break;
      default:
        break;
    }
    try {
      const newWorkflowStatus = await contract.workflowStatus();
      dispatch({
        type: actions.updateWorkflowStatus,
        newWorkflowStatus,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen">
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
      <div>Add voter</div>
    </div>
  );
}

export default ManageSession;
