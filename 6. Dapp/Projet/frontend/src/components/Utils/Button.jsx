import React from 'react';
import PropTypes from 'prop-types';

function Button({ children }) {
  return (
    <div className="bg-cyan-300 p-3 font-semibold rounded-lg text-sky-800 hover:scale-110 transition ease-in-out duration-300 animate-pulse">
      {children}
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
