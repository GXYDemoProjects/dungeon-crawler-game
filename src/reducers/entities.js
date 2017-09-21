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
      return {
        ...state,
        [action.entity.entityName]: {
          ...action.entity,
          x: action.location.x,
          y: action.location.y
        }
      };
    default:
      return state;
  }
};
export default entities;