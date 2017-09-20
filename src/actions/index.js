import * as gameType from '../constants/gameType';

// action for creating the map
export const setMap = (map) => ({
  type: gameType.SET_MAP,
  map
});
