import React from 'react';
import PropTypes from 'prop-types';
import StatusRow from './StatusRow';
import Player from '../images/player_large.png';

const PlayerStat = ({ player }) => (
  <div className="player-status">
    <div className="image-wrapper">
      <img src={Player} alt="Player"/>
    </div>
    <div className="info">
      <table>
        <tbody>             
          <StatusRow title={'Health'} value={player.health}/>
          <StatusRow title={'Weapon'} value={player.weapon}/>
          <StatusRow title={'Attack'} value={player.attack}/>
          <StatusRow title={'Level'} value={player.level}/>
          <StatusRow title={'To Next Level'} value={player.toNextLevel}/>
        </tbody>
      </table>
    </div>
</div>
);

PlayerStat.propTypes = {
  player: PropTypes.object.isRequired
}; 

export default PlayerStat;

