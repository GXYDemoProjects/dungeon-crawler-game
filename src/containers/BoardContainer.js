import React from 'react';
import Board from '../components/Board';
import * as gameType from '../constants/gameType';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import Map from '../unit/mapCreator';

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('will mount!');
  }
  componentDidMount() {
    console.log('did mount!');
    this.mapCreator = new Map();
    // const map = this.mapCreator.createMap();    
    // this.props.setMap(map);
    this.fillMap();
    
  }
  fillMap() {
    const {map, occupiedSpaces, level, addEntity, setLocation} = this.props;
    // Place player
    setLocation('player', this.getEmptyCoords(map, occupiedSpaces));
    // Place items
    const weapon = gameType.weaponTypes[level];
    addEntity(weapon, this.getEmptyCoords(map, occupiedSpaces));
    // Place heath and enemies
    const NUM_THINGS = 5,
          HEALTH_VAL = 20,
          LEVEL_MULT = this.props.level + 1;
    for (let i = 0; i < NUM_THINGS; i++) {
      const energyEntity = {
        entityName: `health${i}`,
        entityType: gameType.entityType.ENERGY,
        health: HEALTH_VAL,
        attack: 0
      };
      const enemyEntity = {
        entityName: `enemy${i}`,
        entityType: gameType.entityType.ENEMY,
        health: LEVEL_MULT * gameType.ENEMY.health,
        attack: LEVEL_MULT * gameType.ENEMY.attack
      };
      addEntity(energyEntity, this.getEmptyCoords(map, occupiedSpaces));
      addEntity(enemyEntity, this.getEmptyCoords(map, occupiedSpaces));
    }
    // Place exit if not last level
    if (level < 4) {
      const doorEntity = {
        entityName: 'door',
        entityType: gameType.entityType.DOOR,
        health: 0,
        attack: 0
      };
      addEntity(doorEntity, this.getEmptyCoords(map, occupiedSpaces));
    }
    // Place boss on last (fifth) level
    if (level === 4) {
      const bossEntity = {
        entityName: 'door',
        entityType: gameType.entityType.BOSS,
        health: 500,
        attack: 125
      };
      addEntity(bossEntity, this.getEmptyBossCoords(map, occupiedSpaces));
    }
  }
  isEmpty(map, occupiedSpaces, x, y) {
    return map[x][y] !== gameType.tileType.WALL && !occupiedSpaces[x + 'x' + y];
  }
  getEmptyCoords(map, occupiedSpaces) {
    let coords, x, y;
    do {
      x = Math.floor(Math.random() * map.length);
      y = Math.floor(Math.random() * map[0].length);
      if (this.isEmpty(map, occupiedSpaces, x, y)) {
        coords = { x: x, y: y };
      }
    } while (!coords);
    return coords;
  }
  getEmptyBossCoords(map, occupiedSpaces) {
    let isEmptyBoss = false, coord;
    while(!isEmptyBoss) {
      coord = this.getEmptyCoords(map, occupiedSpaces);
      const {x, y} = coord;
      const coords = [{x, y}, {x:x+1, y}, {x, y:y+1}, {x:x+1, y:y+1}];
      isEmptyBoss = coords.every((coord) => this.isEmpty(map, occupiedSpaces, coord.x, coord.y));
    }
    return coord;
  }
  visibleBoard() {
    const {map, occupiedSpaces, player, width, height, darkness} = this.props;
    let startX = Math.floor(player.x - height / 2);
    let startY = Math.floor(player.y - width / 2);
    startX = startX < 0 ? 0 : startX;
    startY = startY < 0 ? 0 : startX;
    let endX = startX + height;
    let endY = startY + width;
    if (endX > map.length) {
      endX = map.length;
      startX = endX - height;
    }
    if (endY > map[0].length) {
      endY = map[0].length;
      startY = endY - width;
    }
    let visibleBoard = [];
    for (let i = startX; i < endX; i += 1) {
      visibleBoard.push([]);
      for (let j = startY; j < endY; j += 1) {
        if(darkness && (Math.abs(i-player.x) > gameType.SIGHT || Math.abs(j-player.y) > gameType.SIGHT)) {
          visibleBoard[i - startX][j - startY] = gameType.tileType.DARK;
        } else {
          const entity = occupiedSpaces[`${i}x${j}`];
          visibleBoard[i - startX][j - startY] = (entity === undefined
            ? map[i][j]
            : entity);
        }
      }
    }
    return visibleBoard;
  };
  render() {
    console.log('render!'); 
    const map = this.visibleBoard();
    console.log('map:',map);
    return (
      <Board map={map} />
    );
  };
}


const getOccupiedSpaces = ({ entities }) => {
  const occupiedSpaces = {};
  for(let name of Object.keys(entities)) {
    const entity = entities[name];
    if(entity.entityType === gameType.entityType.BOSS) {
      for(let i=0;i<2;i++) {
        for(let j=0;j<2;j++) {
          const key = `${entity.x+i}x${entity.y+j}`;
          occupiedSpaces[key] = entity.entityType;
        }
      }      
    } else {
      const key = `${entity.x}x${entity.y}`;
      occupiedSpaces[key] = entity.entityType;
    }
  }
  return occupiedSpaces;
};

const mapStateToProps = (state) => {
  return ({
    map: state.map,
    occupiedSpaces: getOccupiedSpaces(state),
    player: state.entities.player,
    width: state.width,
    height: state.height,
    level: state.level,
    darkness: state.darkness
  });
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);


BoardContainer = connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
// BoardContainer = connect(mapStateToProps)(BoardContainer);
export default BoardContainer;
