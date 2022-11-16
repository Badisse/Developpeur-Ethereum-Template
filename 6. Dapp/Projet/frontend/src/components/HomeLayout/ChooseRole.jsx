import React, { useState } from 'react';

function ChooseRole() {
  const [adminIsToggle, toggleAdmin] = useState(true);
  const [voterIsToggle, toggleVoter] = useState(false);

  return (
    <div className="flex w-2/3 justify-around bg-red-600">
      <div>
        <div className="flex justify-between items-center w-60 bg-green-500">
          <div>Administrator</div>
          <button
            type="button"
            className="border p-2"
            onClick={() => {
              toggleAdmin(!adminIsToggle);
              toggleVoter(!voterIsToggle);
            }}
          >
            +
          </button>
        </div>
        {
          adminIsToggle && (
            <>
              <div>Create Voting Session</div>
              <div>Manage Voting Session</div>
            </>
          )
        }

      </div>
      <div>
        <div className="flex justify-between items-center w-60 bg-green-500">
          <div>Voter</div>
          <button
            type="button"
            className="border p-2"
            onClick={() => {
              toggleAdmin(!adminIsToggle);
              toggleVoter(!voterIsToggle);
            }}
          >
            +
          </button>
        </div>
        {
          voterIsToggle && (
            <div>Access Voting Session</div>
          )
        }
      </div>
    </div>
  );
}

export default ChooseRole;
