import React from 'react';
import PropTypes from 'prop-types';
import { tileType } from '../constants/gameType';

const Square = ({ value, posX, posY}) => {
  let tileClass = 'tile ';
  switch (value) {
    case tileType.WALL:
      tileClass += 'wall';
      break;
    case tileType.FLOOR:
      tileClass += 'floor';
      break;
    case tileType.PLAYER:
      tileClass += 'floor player';
      break;
    case tileType.WEAPON:
      tileClass += 'floor weapon';
      break;
    case tileType.ENERGY:
      tileClass += 'floor energy';
      break;
    case tileType.DOOR:
      tileClass += 'floor door';
      break;
    case tileType.ENEMY:
      tileClass += 'floor enemy';
      break;
    case tileType.BOSS:
      tileClass += 'floor boss';
      break;      
    case tileType.DARK:
      tileClass += 'floor dark';
      break;        
    default:
      break;
  }

  return (
    <span className={tileClass}></span>
  );
};

Square.propTypes = {
  value: PropTypes.number.isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
};

export default Square;