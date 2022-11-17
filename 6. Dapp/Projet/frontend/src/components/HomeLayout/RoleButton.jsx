import React from 'react';
import PropTypes from 'prop-types';
import useEth from '../../contexts/EthContext/useEth';
import { actions } from '../../contexts/EthContext/state';

function RoleButton({ userRole }) {
  const { dispatch } = useEth();

  const handleClick = () => {
    dispatch({
      type: actions.updateRole,
      data: {
        userRole,
      },
    });
  };

  return (
    <button
      type="button"
      className="border p-2"
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
