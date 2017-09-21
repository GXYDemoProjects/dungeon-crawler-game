import *  as gameType from '../constants/gameType';

const map = (state = [], action) => {
  switch (action.type) {
    case gameType.SET_MAP:
      return action.map;
    default:
      return state;
  }
};

export default map;