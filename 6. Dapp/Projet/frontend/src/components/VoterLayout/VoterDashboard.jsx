import React, { useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import { actions } from '../../contexts/EthContext/state';
import WORKFLOW_STATUS, { WORKFLOW_STATUS_STRING } from '../../constants/workflowStatus';

function VoterDashboard() {
  const { state: { contract, provider, workflowStatus }, dispatch } = useEth();
  const [proposalDesc, setProposalDesc] = useState('');
  const [proposalId, setProposalId] = useState('');
  const [voterAddress, setVoterAddress] = useState('');
  const [oneProposalId, setOneProposalId] = useState('');
  const [voter, setVoter] = useState();
  const [proposal, setProposal] = useState();

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

  const getVoter = async () => {
    try {
      const res = await contract.getVoter(voterAddress);
      console.log(res.isRegistered);
      setVoter(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getOneProposal = async () => {
    try {
      const res = await contract.getOneProposal(oneProposalId);
      setProposal(res);
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
      {
        workflowStatus === WORKFLOW_STATUS.proposalsRegistrationStarted
        && (
          <div>
            <div>Add proposal</div>
            <input
              type="text"
              className="text-gray-800"
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
              className="text-gray-800"
              placeholder="Contract Address"
              value={proposalId}
              onChange={(e) => setProposalId(e.target.value)}
            />
            <button type="button" onClick={vote}>Vote</button>
          </div>
        )
      }
      <div>
        <div>Get Voter</div>
        <input
          type="text"
          className="text-gray-800"
          placeholder="Voter Address"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
        />
        <button type="button" onClick={getVoter}>Get</button>
        <div>
          {
            voter
              ? (
                <>
                  <div>{voter.isRegistered ? 'registered' : 'not registered'}</div>
                  <div>{voter.hasvoted ? 'has voted' : 'not voted yet'}</div>
                  <div>{voter.votedProposalId.toNumber()}</div>
                </>
              )
              : undefined
          }

        </div>
      </div>
      <div>
        {
          workflowStatus >= WORKFLOW_STATUS.proposalsRegistrationStarted
          && (
            <>
              <div>Get One Proposal</div>
              <input
                type="text"
                className="text-gray-800"
                placeholder="Proposal Id"
                value={oneProposalId}
                onChange={(e) => setOneProposalId(e.target.value)}
              />
              <button type="button" onClick={getOneProposal}>Get</button>
              {
                proposal
                  ? (
                    <>
                      <div>{proposal.description}</div>
                      <div>{proposal.voteCount.toNumber()}</div>
                    </>
                  )
                  : undefined
              }
            </>
          )
        }
      </div>
    </div>
  );
}

export default VoterDashboard;
