import React from 'react';
import PropTypes from 'prop-types';
import StatusRow from './StatusRow';
import Boss from '../images/boss_large.png';

const GameStat = ({ game }) => (
  <div className="game-status">
    <div className="image-wrapper">
      <img src={Boss} alt="Boss"/>
    </div>
    <div className="info">
      <table>
        <tbody>             
          <StatusRow title={'Level'} value={game.level}/>
          <StatusRow title={'Enemies'} value={game.enemiesNum}/>
          <StatusRow title={'Energies'} value={game.energiesNum}/>
        </tbody>
      </table>
    </div>
</div>
);

GameStat.propTypes = {
  game: PropTypes.object.isRequired
}; 

export default GameStat;

