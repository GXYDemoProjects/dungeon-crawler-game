import * as gameType from '../constants/gameType';

// action for creating the map
export const setMap = (map) => ({
  type: gameType.SET_MAP,
  map
});

export const setLocation = (entityName, location) => ({
  type: gameType.SET_LOCATION,
  entityName,
  location
});

export const addEntity = (entity, location) => ({
  type: gameType.ADD_ENTITY,
  entity,
  location
});
export const removeEntity = (entityName, location) => ({
  type: gameType.REMOVE_ENTITY,
  entityName
});
export const initEntity = (initState) => ({
  type: gameType.INIT_ENTITY,
  initState
});
export const toggleDarkness = () => ({
  type: gameType.TOGGLE_DARKNESS
});

export const move = (entityName, vector) => ({
  type: gameType.MOVE,
  entityName,
  vector
});

export const switchWeapon = (weapon, attack) => ({
  type: gameType.SWITCH_WEAPON,
  weapon,
  attack
});

export const resetBoard = () => ({
  type: gameType.RESET_BOARD
});

export const increaseLevel = () => ({
  type: gameType.INCREASE_LEVEL
});

export const damage = (entityName, health) => ({
  type: gameType.DAMAGE,
  entityName,
  health
});

export const heal = (entityName, health) => ({
  type: gameType.HEAL,
  entityName,
  health
});

export const resetLevel = () => ({
  type: gameType.RESET_LEVEL
});

export const gainXp = (xp) => ({
  type: gameType.GAIN_XP,
  xp
});

export const levelUp = (attack, health, toNextLevel) => ({
  type: gameType.LEVEL_UP,
  attack,
  health,
  toNextLevel
});

export const resetMap = (map) => ({
  type: gameType.RESET_MAP,
  map
});
