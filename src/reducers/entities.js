import * as gameType from '../constants/gameType';

const entities = (state = {}, action) => {
  switch (action.type) {
    case gameType.SET_LOCATION:
      return {
        ...state,
        [action.entityName]: {
          ...state[action.entityName],
          x: action.location.x,
          y: action.location.y
        }
      };
    case gameType.ADD_ENTITY:
      console.log('action.entity:',action.entity);
      return {
        ...state,
        [action.entity.entityName]: {
          ...action.entity,
          x: action.location.x,
          y: action.location.y
        }
      };
    case gameType.REMOVE_ENTITY:
      let copy = {...state};
      delete copy[action.entityName]
      return copy;
    case gameType.INIT_ENTITY:
      return action.initState;
    case gameType.DAMAGE:
      return {
        ...state,
        [action.entityName]: {
          ...state[action.entityName],
          health: state[action.entityName].health - action.health
        }
      };
    case gameType.HEAL:
      return {
        ...state,
        [action.entityName]: {
          ...state[action.entityName],
          health: state[action.entityName].health + action.health
        }
      };
    case gameType.SWITCH_WEAPON:
      return {
        ...state,
        player: {
          ...state.player,
          weapon: action.weapon,
          health: action.attack
        }
      }
    case gameType.MOVE:
      return {
        ...state,
        [action.entityName]: {
          ...state[action.entityName],
          x: state[action.entityName].x + action.vector.x,
          y: state[action.entityName].y + action.vector.y
        }
      };
    case gameType.RESET_BOARD:
      return {
        player: state.player
      };
    case gameType.GAIN_XP:
      return {
        ...state,
        player: {
          ...state.player,
          toNextLevel: state.player.toNextLevel - action.xp
        }
      };
    case gameType.LEVEL_UP:
      return {
        ...state,
        player: {
          ...state.player,
          attack: state.player.attack + action.attack,
          health: state.player.health + action.health,
          toNextLevel: action.toNextLevel,
          level: state.player.level + 1
        }
      };           
    default:
      return state;
  }
};
export default entities;