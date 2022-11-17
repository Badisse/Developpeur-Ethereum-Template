import React from 'react';
import { BiWallet } from 'react-icons/bi';
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
      <h1 className="text-5xl font-bold">Welcome to The Voting DApp</h1>
      <h2 className="text-xl">This Web3 App allow you to create, manage or access a voting session !</h2>
      {
        !account
          ? (
            <button
              className="bg-cyan-800 drop-shadow-2xl flex items-center gap-5 p-5 font-semibold rounded-2xl animate-pulse hover:scale-125 transition ease-in-out duration-300"
              type="button"
              onClick={handleConnect}
            >
              <BiWallet size="2em" />
              <div>Connect Your Wallet</div>
            </button>
          )
          : <ChooseRole />
      }
    </div>
  );
}

export default Home;
