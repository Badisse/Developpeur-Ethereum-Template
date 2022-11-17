import React from 'react';
import useEth from '../contexts/EthContext/useEth';

function UserAddr() {
  const { state: { account } } = useEth();
  console.log('usrAddr');
  return (
    <div
      className="bg-pink-800 py-2 px-6 font-semibold rounded-full absolute top-4 right-4"
    >
      {account.substring(0, 6)}
      ...
      {account.substring(account.length - 4)}
    </div>
  );
}

export default UserAddr;
