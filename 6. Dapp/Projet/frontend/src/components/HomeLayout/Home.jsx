import React from 'react';
import useEth from '../../contexts/EthContext/useEth';
import ChooseRole from './ChooseRole';

function Home() {
  const { init, state: { account } } = useEth();

  const handleConnect = () => {
    console.log('connect');
    init();
  };

  return (
    <>
      {
        account
        && (
          <div
            className="bg-pink-800 py-2 px-6 font-semibold rounded-full absolute top-4 right-4"
          >
            {account.substring(0, 6)}
            ...
            {account.substring(account.length - 4)}
          </div>
        )
      }
      <div className="h-screen flex flex-col items-center justify-center gap-10">
        <h1 className="text-5xl font-bold">Welcome To the Voting App</h1>
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
    </>
  );
}

export default Home;
