import React from 'react';
import PropTypes from 'prop-types';

function Card({ children }) {
  return (
    <div className="flex flex-col items-center justify-between gap-10 bg-gradient-to-t from-cyan-700 to-sky-800 rounded-2xl p-12">
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
