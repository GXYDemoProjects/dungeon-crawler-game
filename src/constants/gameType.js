// Action constants
export const SET_MAP = 'SET_MAP';
export const SET_LOCATION = 'SET_LOCATION';
export const ADD_ENTITY = 'ADD_ENTITY';
export const REMOVE_ENTITY = 'REMOVE_ENTITY';
export const INIT_ENTITY = 'INIT_ENTITY';
export const TOGGLE_DARKNESS= 'TOGGLE_DARKNESS';
export const MOVE = 'MOVE';
export const SWITCH_WEAPON = 'SWITCH_WEAPON';
export const RESET_BOARD = 'RESET_BOARD';
export const INCREASE_LEVEL = 'INCREASE_LEVEL '; 
export const RESET_LEVEL = 'RESET_LEVEL';
export const DAMAGE = 'DAMAGE';
export const HEAL = 'HEAL';
export const GAIN_XP = 'GAIN_XP';
export const LEVEL_UP = 'LEVEL_UP';
export const RESET_MAP = 'RESET_MAP';


export const SIGHT = 3; 
export const ATTACK_VARIANCE = 7;
export const entityType = {
  PLAYER: 2,
  WEAPON: 3,
  ENERGY: 4,
  DOOR: 5,
  ENEMY: 6,
  BOSS: 7,
};

export const tileType = {
  WALL: 0,
  FLOOR: 1,
  PLAYER: 2,
  WEAPON: 3,
  ENERGY: 4,
  DOOR: 5,
  ENEMY: 6,
  BOSS: 7,
  DARK: 8
};

export const weaponTypes = [
  {
    entityName: 'brass knuckles',
    entityType: entityType.WEAPON,
    health: 0,
    attack: 7
  },
  {
    entityName: 'serrated dagger',
    entityType: entityType.WEAPON,
    health: 0,
    attack: 12
  },
  {
    entityName: 'katana',
    entityType: entityType.WEAPON,
    health: 0,
    attack: 16
  },
  {
    entityName: 'reaper\'s scythe',
    entityType: entityType.WEAPON,
    health: 0,
    attack: 22
  },
  {
    entityName: 'large trout',
    entityType: entityType.WEAPON,
    health: 0,
    attack: 30
  }
];
// enemy attacks and health are the dungeon level + 1 times these constants
export const ENEMY = {
  health: 20,
  attack: 12,
  xp: 10
};
export const PLAYER = {
  baseHealth: 100,
  health: 20,
  attack: 12,
  toNextLevel: 60
};

export const initEntity = {
  player: {
    entityType: entityType.PLAYER,
    x: 0,
    y: 0,
    health: 100,
    weapon: 'stick',
    attack: 7,
    level: 0,
    toNextLevel: 60,
  }
};
