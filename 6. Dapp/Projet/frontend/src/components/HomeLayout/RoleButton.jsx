import React from 'react';
import PropTypes from 'prop-types';
import useEth from '../../contexts/EthContext/useEth';
import { actions } from '../../contexts/EthContext/state';

function RoleButton({ userRole }) {
  const { dispatch } = useEth();

  const handleClick = () => {
    dispatch({
      type: actions.setRole,
      userRole,
    });
  };

  return (
    <button
      type="button"
      className="bg-cyan-300 p-3 font-semibold rounded-lg text-sky-800 hover:scale-110 transition ease-in-out duration-300 animate-pulse"
      onClick={handleClick}
    >
      {userRole.name}
    </button>
  );
}

RoleButton.propTypes = {
  userRole: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoleButton;
