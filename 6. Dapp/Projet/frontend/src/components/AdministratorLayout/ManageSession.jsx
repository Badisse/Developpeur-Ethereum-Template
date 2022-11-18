import React, { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import WORKFLOW_STATUS, { WORKFLOW_STATUS_STRING } from '../../constants/workflowStatus';
import { actions } from '../../contexts/EthContext/state';

function ManageSession() {
  const { state: { workflowStatus, contract, provider }, dispatch } = useEth();
  const [voterAddress, setVoterAddress] = useState('');
  const [voters, setVoters] = useState([]);

  const getVoterRegisteredEvents = async () => {
    const eventFilter = contract.filters.VoterRegistered();
    const events = await contract.queryFilter(eventFilter);
    return events;
  };

  const getVoters = async () => {
    const events = await getVoterRegisteredEvents();
    events.forEach((event) => {
      console.log(event.args.voterAddress);
      setVoters((current) => {
        if (current.includes(event.args.voterAddress)) {
          return [...current];
        }
        return [...current, event.args.voterAddress];
      });
    });
  };

  useEffect(() => {
    getVoters();
  }, []);

  const updateWorkflowStatus = async () => {
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
    dispatch({
      type: actions.loading,
    });
    if (transaction) {
      provider.waitForTransaction(transaction.hash).then(async () => {
        const newWorkflowStatus = await contract.workflowStatus();
        dispatch({
          type: actions.updateWorkflowStatus,
          workflowStatus: newWorkflowStatus,
        });
      });
    }
  };

  const addVoter = async () => {
    const transaction = await contract.addVoter(voterAddress);
    dispatch({
      type: actions.loading,
    });
    if (transaction) {
      provider.waitForTransaction(transaction.hash).then(async () => {
        dispatch({
          type: actions.finished,
        });
      });
    }
  };

  return (
    <div className="h-screen">
      <div>
        <div>
          Current Workflow Status:
          {WORKFLOW_STATUS_STRING[workflowStatus]}
        </div>
        {
          workflowStatus !== WORKFLOW_STATUS.votingSessionEnded
          && (
            <>
              <div>Update Workflow Status</div>
              <button
                type="button"
                className="border"
                onClick={updateWorkflowStatus}
              >
                Update
              </button>
            </>
          )
        }
      </div>
      {workflowStatus === WORKFLOW_STATUS.registeringVoters
        && (
          <div>
            <div>
              Add voter
            </div>
            <input
              type="text"
              className="text-gray-800"
              onChange={
                (e) => setVoterAddress(e.target.value)
              }
              value={voterAddress}
            />
            <button
              type="button"
              className="border"
              onClick={addVoter}
            >
              Add
            </button>
          </div>
        )}
      {
        voters?.map((voter) => <div key={voter}>{voter}</div>)
      }
    </div>
  );
}

export default ManageSession;
