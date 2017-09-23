import React from 'react';
import App from '../components/App';
import * as gameType from '../constants/gameType';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import Map from '../unit/mapCreator';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    console.log('will mount!');
    
  }
  componentDidMount() {
    console.log('did mount!');
    this.props.setupGame();

    window.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps:',nextProps);
  }


  handleKeyPress(e) {
    let vector = '';
    switch (e.keyCode) {
      case 37:
        vector = {x: 0, y: -1};
        break;
      case 38:
        vector = {x: -1, y: 0};
        break;
      case 39:
        vector = {x: 0, y: 1};
        break;
      case 40:
        vector = {x: 1, y: 0};
        break;
      default:
        vector = '';
        break;
    }
    if (vector) {
      e.preventDefault();
      this.props.handleMove(vector);
    }
  }

  render() {
    console.log('render!'); 
    const { visibleBoard, entities, toggleDarkness, game, setupGame, level} = this.props;
    const player = entities.player;
    game.level = level;
    return (
      visibleBoard!==null && <App map={visibleBoard} player={player} game={game} restartGame={setupGame} toggleDarkness={toggleDarkness}/>
    );
  };
}

// mapStateToProps
const getOccupiedSpaces = ({entities}) => {
  const occupiedSpaces = {};
  for(let name of Object.keys(entities)) {
    const entity = entities[name];
    if(entity.entityType === gameType.entityType.BOSS) {
      for(let i=0;i<2;i++) {
        for(let j=0;j<2;j++) {
          const key = `${entity.x+i}x${entity.y+j}`;
          occupiedSpaces[key] = {
            entityType: entity.entityType,
            entityName: `boss${i*2+j}`
          };
        }
      }      
    } else {
      const key = `${entity.x}x${entity.y}`;
      occupiedSpaces[key] = {
        entityType: entity.entityType,
        entityName: name
      };
    }
  }
  return occupiedSpaces;
};

const getEntitiesNumber = ({ entities }, entityType) => {
  let num = 0;
  for(let entityName of Object.keys(entities)) {
    const entity = entities[entityName];
    if(entity.entityType === entityType) {
      num++;
    }
  }
  return num;
};

const visibleBoard = (state) => {
  const {map, entities, width, height, darkness} = state;
  const occupiedSpaces = getOccupiedSpaces(state);
  if(map.length === 0) return null;
  let startX = Math.floor(entities.player.x - height / 2);
  let startY = Math.floor(entities.player.y - width / 2);
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
      if(darkness && (Math.abs(i-entities.player.x) > gameType.SIGHT || Math.abs(j-entities.player.y) > gameType.SIGHT)) {
        visibleBoard[i - startX][j - startY] = {type:gameType.tileType.DARK, name:'dark'};
      } else {
        const entity = occupiedSpaces[`${i}x${j}`];
        visibleBoard[i - startX][j - startY] = (entity === undefined
          ? {type: map[i][j], name: 'wall or floor'}
          : {type: entity.entityType, name: entity.entityName});
      }
    }
  }
  return visibleBoard;
};

// merge props
const isEmpty = (map, occupiedSpaces, x, y) => {
  return map[x][y] !== gameType.tileType.WALL && !occupiedSpaces[x + 'x' + y];
};
const getEmptyCoords = (getState) => {
  const { map } = getState();
  const occupiedSpaces = getOccupiedSpaces(getState()); 
  let coords, x, y;
  do {
    x = Math.floor(Math.random() * map.length);
    y = Math.floor(Math.random() * map[0].length);
    if (isEmpty(map, occupiedSpaces, x, y)) {
      coords = { x: x, y: y };
    }
  } while (!coords);
  return coords;
};
const getEmptyBossCoords = (getState) => {
  let isEmptyBoss = false, coord;
  while(!isEmptyBoss) {
    coord = getEmptyCoords(getState);
    const { map } = getState();
    const occupiedSpaces = getOccupiedSpaces(getState()); 
    const {x, y} = coord;
    const coords = [{x, y}, {x:x+1, y}, {x, y:y+1}, {x:x+1, y:y+1}];
    isEmptyBoss = coords.every((coord) => isEmpty(map, occupiedSpaces, coord.x, coord.y));
  }
  return coord;
};

const fillMap = (dispatch, getState) => {
  console.log('fill map!');
  const { level } = getState();
  // Place player
  dispatch(actionCreators.setLocation('player', getEmptyCoords(getState)));
  // Place items
  const weapon = gameType.weaponTypes[level];
  dispatch(actionCreators.addEntity(weapon, getEmptyCoords(getState)));
  // Place heath and enemies
  const NUM_THINGS = 5,
        HEALTH_VAL = 20,
        LEVEL_MULT = level + 1;
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
    dispatch(actionCreators.addEntity(energyEntity, getEmptyCoords(getState)));
    dispatch(actionCreators.addEntity(enemyEntity, getEmptyCoords(getState)));
  }
  // Place exit if not last level
  if (level < 4) {
    const doorEntity = {
      entityName: 'door',
      entityType: gameType.entityType.DOOR,
      health: 0,
      attack: 0
    };
    dispatch(actionCreators.addEntity(doorEntity, getEmptyCoords(getState)));
  }
  // Place boss on last (fifth) level
  if (level === 4) {
    const bossEntity = {
      entityName: 'boss',
      entityType: gameType.entityType.BOSS,
      health: 500,
      attack: 125
    };
    dispatch(actionCreators.addEntity(bossEntity, getEmptyBossCoords(getState)));
  }
};


const setupGame = () => {
  return (dispatch, getState) => {
    const mapCreator = new Map();
    const map = mapCreator.createMap();
    // dispatch(actionCreators.setMap(map)).then(
    //   () => {
    //     dispatch(actionCreators.initEntity(gameType.initEntity));
    //     dispatch(actionCreators.resetLevel());
    //   },
    //   err => console.log('err:',err)
    // ).then(
    //   () => {
    //     fillMap(dispatch, getState);
    //   },
    //   err => console.log('err:',err)
    // );
    dispatch(actionCreators.setMap(map));
    dispatch(actionCreators.initEntity(gameType.initEntity));
    dispatch(actionCreators.resetLevel()); 
    fillMap(dispatch, getState);
      
    
  };
};
const levelUpGame = () => {
  return (dispatch, getState) => {
    const mapCreator = new Map();
    const map = mapCreator.createMap();
    dispatch(actionCreators.resetBoard(gameType.initEntity));
    dispatch(actionCreators.resetMap(map));
    dispatch(actionCreators.increaseLevel());
    fillMap(dispatch, getState);;
  };
};

const addVector = (coords, vector) => {
  return {x: coords.x + vector.x, y: coords.y + vector.y};
};
const playerLevelUp = (dispatch, getState) => {
  const curLevel = getState().entities.player.level + 1;
  dispatch(actionCreators.levelUp(curLevel * gameType.PLAYER.attack, curLevel * gameType.PLAYER.health, (curLevel + 1) * gameType.PLAYER.toNextLevel));
};

const handleMove = (vector) => {
  return (dispatch, getState) => {
    const { map, level, entities} = getState();
    const occupiedSpaces = getOccupiedSpaces(getState()); 
    const player = entities.player;
    const newCoords = addVector({x: player.x, y: player.y}, vector);
    if (newCoords.x >= 0 && newCoords.y >= 0 && newCoords.x < map.length &&
        newCoords.y < map[0].length &&
        map[newCoords.x][newCoords.y] !== gameType.tileType.WALL) {
      // Tile is not a wall, determine if it contains an entity
      const occupiedEntity = occupiedSpaces[newCoords.x + 'x' + newCoords.y];
      // move and return if empty
      if (!occupiedEntity) {
        dispatch(actionCreators.move('player', vector));
        return;
      }
      // handle encounters with entities
      const entityType = occupiedEntity.entityType;
      let entityName = occupiedEntity.entityName;
      if(entityName.startsWith('boss')) {
        entityName = 'boss';
      }
      const entity = entities[entityName];
      switch (entity.entityType) {
        case gameType.entityType.WEAPON:
          dispatch(actionCreators.switchWeapon(entityName, entity.attack));
          dispatch(actionCreators.removeEntity(entityName));
          dispatch(actionCreators.move('player', vector));
          break;
        case gameType.entityType.BOSS:
        case gameType.entityType.ENEMY:
          const playerAttack = Math.floor((Math.random() * gameType.ATTACK_VARIANCE) + entities.player.attack);
          // const playerAttack = Math.floor((Math.random() * gameType.ATTACK_VARIANCE) + entities.player.attack - gameType.ATTACK_VARIANCE);
          const enemyAttack = Math.floor((Math.random() * gameType.ATTACK_VARIANCE) + entity.attack - gameType.ATTACK_VARIANCE);
          // Will hit kill enemy?
          if (entity.health > playerAttack) {
            // Will rebound hit kill player?
            if (enemyAttack > player.health) {
              // notifier
              // notifier.error('You died. Better luck next time!');
              alert('You died. Better luck next time!');
              dispatch(setupGame());
              return;
            }
            dispatch(actionCreators.damage(entityName, playerAttack));
            dispatch(actionCreators.damage('player', enemyAttack));
          } else {
            // Is the enemy a boss?
            if (entityType === gameType.entityType.BOSS) {
              // notifier
              alert('A winner is you!');
              dispatch(setupGame());
              return;
            }
            dispatch(actionCreators.gainXp((level + 1) * gameType.ENEMY.xp));
            if (getState().entities.player.toNextLevel <= 0) {
              playerLevelUp(dispatch, getState);
            }
            dispatch(actionCreators.removeEntity(entityName));
            dispatch(actionCreators.move('player', vector));
          }
          break;
        case gameType.entityType.ENERGY:
          dispatch(actionCreators.heal('player', entity.health));
          dispatch(actionCreators.removeEntity(entityName));
          dispatch(actionCreators.move('player', vector));
          break;
        case gameType.entityType.DOOR:
          dispatch(levelUpGame());
          break;
        default:
          break;
      }
    }
  };
};



const mapStateToProps = (state) => {
  return Object.assign({}, {
    map: state.map,
    visibleBoard: visibleBoard(state), 
    entities: state.entities,
    occupiedSpaces: getOccupiedSpaces(state),
    width: state.width,
    height: state.height,
    darkness: state.darkness,
    game: {
      enemiesNum: getEntitiesNumber(state, gameType.entityType.ENEMY),
      energiesNum: getEntitiesNumber(state, gameType.entityType.ENERGY)
    },
    level: state.level,
  });
};

const mapDispatchToProps = (dispatch) => ({
  setupGame: () => dispatch(setupGame()),
  toggleDarkness: () => dispatch(actionCreators.toggleDarkness()),
  handleMove: (vector) => dispatch(handleMove(vector))
});

// const mergeProps = (propsFromState, propsFromDispatch) => {
//   return Object.assign({}, {
//   setupGame: setupGame.bind(this, propsFromState, propsFromDispatch),
//   handleMove: handleMove.bind(this, propsFromState, propsFromDispatch),
//   toggleDarkness: propsFromDispatch.toggleDarkness,
//   visibleBoard: visibleBoard(propsFromState),
//   entities: propsFromState.entities,
//   level: propsFromState.level,
//   game: propsFromState.game,
// });
// };

AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
// BoardContainer = connect(mapStateToProps)(BoardContainer);
export default AppContainer;
