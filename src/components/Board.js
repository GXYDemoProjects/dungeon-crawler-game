import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
// import Map from '../unit/mapCreator';

import '../styles/board.css';

const Board = ({ map }) => (
  
    <div className="board">
      {map.map((row, posX) => <Row key={`row${posX}`} row={row} posX={posX}/>)}
    </div>
      
  );
  

Board.propTypes = {
  map: PropTypes.array.isRequired
};

export default Board;
