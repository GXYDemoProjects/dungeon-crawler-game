import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

const Row = ({ row, posX, occupiedSpaces }) => (
  <div className="board-row">
    {row.map((value, posY) => (
      <Square key={`col${posY}`} posX={posX} posY={posY} value={value} occupiedSpaces={occupiedSpaces}/>
    ))}
  </div>
);
Row.propTypes = {
  row: PropTypes.array.isRequired,
  posX: PropTypes.number.isRequired,
};

export default Row;