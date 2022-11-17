import React, { useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import { actions } from '../../contexts/EthContext/state';
import WORKFLOW_STATUS, { WORKFLOW_STATUS_STRING } from '../../constants/workflowStatus';

function VoterDashboard() {
  const { state: { contract, provider, workflowStatus }, dispatch } = useEth();
  const [proposalDesc, setProposalDesc] = useState('');
  const [proposalId, setProposalId] = useState('');

  const addProposal = async () => {
    const transaction = await contract.addProposal(proposalDesc);
    dispatch({
      type: actions.loading,
    });
    provider.waitForTransaction(transaction.hash).then(async () => {
      dispatch({
        type: actions.finished,
      });
    });
  };

  // TODO: Limit vote to proposal size, forbid 1
  const vote = async () => {
    const transaction = await contract.setVote(proposalId);
    dispatch({
      type: actions.loading,
    });
    provider.waitForTransaction(transaction.hash).then(async () => {
      dispatch({
        type: actions.finished,
      });
    });
  };

  return (
    <div className="h-screen">
      <div>
        Current Workflow Status:
        {WORKFLOW_STATUS_STRING[workflowStatus]}
      </div>
      {
        workflowStatus === WORKFLOW_STATUS.proposalsRegistrationStarted
        && (
          <div>
            <div>Add proposal</div>
            <input
              type="text"
              placeholder="Contract Address"
              value={proposalDesc}
              onChange={(e) => setProposalDesc(e.target.value)}
            />
            <button type="button" onClick={addProposal}>Add</button>
          </div>
        )
      }
      {
        workflowStatus === WORKFLOW_STATUS.votingSessionStarted
        && (
          <div>
            <div>Vote</div>
            <input
              type="text"
              placeholder="Contract Address"
              value={proposalId}
              onChange={(e) => setProposalId(e.target.value)}
            />
            <button type="button" onClick={vote}>Vote</button>
          </div>
        )
      }
    </div>
  );
}

export default VoterDashboard;
