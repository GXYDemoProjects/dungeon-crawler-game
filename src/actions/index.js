import * as gameType from '../constants/gameType';

// action for creating the map
export const setMap = (map) => ({
  type: gameType.SET_MAP,
  map
});

export const setLocation = (entity, location) => ({
  type: gameType.SET_LOCATION,
  entityName: entity,
  location
});

export const addEntity = (entity, location) => ({
  type: gameType.ADD_ENTITY,
  entity,
  location
});


export const toggleDarkness = () => ({
  type: gameType.TOGGLE_DARKNESS
});