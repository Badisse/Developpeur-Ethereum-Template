import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ConnectButton from './components/ConnectButton';
import CreateVotingSession from './components/CreateVotingSession';
import AddVoter from './components/AddVoter';
import NextWorkflowStatus from './components/NextWorkflowStatus';
import ManageVotingSession from './components/ManageVotingSession';
import AccessVotingSession from './components/AccessVotingSession';

function App() {
  const [admin, setAdmin] = useState(false);
  const [voter, setVoter] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [workflowStatus, setWorkflowStatus] = useState(0);
  const [voters, setVoters] = useState([]);

  console.log(voter);
  console.log(admin);

  return (
    <ChakraProvider>
      <h1>Voting App</h1>
      <ConnectButton
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
        setAdmin={setAdmin}
        setVoter={setVoter}
      />
      {
        admin === voter
          ? (
            <div>
              <h2>Admin</h2>
              <CreateVotingSession setContractAddress={setContractAddress} setAdmin={setAdmin} />
              <ManageVotingSession
                currentAccount={currentAccount}
                setContractAddress={setContractAddress}
                setAdmin={setAdmin}
              />
              <h2>Voter</h2>
              <AccessVotingSession
                currentAccount={currentAccount}
                setContractAddress={setContractAddress}
                setVoter={setVoter}
              />
            </div>
          )
          : undefined
      }

      <h3>{contractAddress}</h3>
      {
        admin
          ? (
            <NextWorkflowStatus
              contractAddress={contractAddress}
              setWorkflowStatus={setWorkflowStatus}
            />
          )
          : undefined
      }
      {
        admin && (workflowStatus === 0)
          ? (
            <AddVoter
              contractAddress={contractAddress}
              setVoters={setVoters}
            />
          )
          : undefined
      }
      <ul>
        {
          voters?.map((item) => <li key={item}>{item}</li>)
        }
      </ul>
    </ChakraProvider>
  );
}

export default App;
