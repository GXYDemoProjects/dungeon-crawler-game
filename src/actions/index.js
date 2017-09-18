import * as gameType from '../constants/gameType';

// action for creating the map
export const createMap = (width, height) => ({
  type: gameType.CREATE_MAP,
  width,
  height
});
