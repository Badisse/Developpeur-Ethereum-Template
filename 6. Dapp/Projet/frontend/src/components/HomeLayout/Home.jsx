import React from 'react';
import useEth from '../../contexts/EthContext/useEth';
import ChooseRole from './ChooseRole';

function Home() {
  const { init, state: { account } } = useEth();
  console.log('home');

  const handleConnect = () => {
    console.log('connect');
    init();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-5xl font-bold">Welcome to The Voting App</h1>
      <h2 className="text-xl">This Web3 App allow you to create, manage or access a voting session !</h2>
      {
        !account
          ? (
            <button
              className="bg-pink-800 p-5 font-semibold rounded-full animate-pulse hover:scale-125 transition ease-in-out duration-300"
              type="button"
              onClick={handleConnect}
            >
              Connect Your Wallet
            </button>
          )
          : <ChooseRole />
      }
    </div>
  );
}

export default Home;
