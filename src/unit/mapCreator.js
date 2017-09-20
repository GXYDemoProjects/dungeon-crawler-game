import { tileType } from '../constants/gameType';

class Map {
  constructor(width = 48, height = 120, maxRoomSize = 15, minRoomSize = 6, numRooms = 20) {
    this.width = width;
    this.height = height;
    this.numRooms = numRooms;
    this.minRoomSize = minRoomSize;
    this.maxRoomSize = maxRoomSize;
  }
  /**
   * @return {number[][]} map
   */
  createMap() {
    // init grid of walls
    // console.log(this.width,this.height,this.minRoomSize,this.maxRoomSize,this.numRooms);
    let map = Array(this.height).fill(0);
    const blankRow = Array(this.width).fill(tileType.WALL);
    map = map.map(() => blankRow.concat());
    // create first room
    this._fillRect(map, {x: Math.floor(map.length/2)-5, y: Math.floor(map[0].length/2)-5}, {x: 10, y: 10}, tileType.FLOOR);
    // create rooms
    for (let i = 0; i < this.numRooms; i++) {
      this._placeRoom(map);
    }
    
    return map;
  }

  /**
   * 
   * @param {number[][]} map 
   * @param {{x:number,y:number}} startCoord 
   * @param {{x:number,y:number}} size 
   * @param {number} fillVal 
   */
  _fillRect(map, startCoord, size, fillVal) {
    for (let i = startCoord.x; i < startCoord.x + size.x; i++) {
      const startY = startCoord.y;
      // console.log(i,map,map[i]);
      map[i] = [...map[i].slice(0,startY), ...map[i].slice(startY, startY + size.y).fill(fillVal), ...map[i].slice(startY + size.y)];
    }
  }

  _placeRoom(map) {
    let wall, width, height, startX, startY, coords, numClear;
    while (true) {
      // Create random location and room
      // TODO - Choose wall or hall
      numClear = 0;
      wall = this._findWall(map);
      coords = wall.coords;
      width = Math.floor((Math.random() * (this.maxRoomSize - this.minRoomSize)) + this.minRoomSize);
      height = Math.floor((Math.random() * (this.maxRoomSize - this.minRoomSize)) + this.minRoomSize);
      switch (wall.openDir) {
        case 'right':
          startY = coords.y - width;
          startX = (coords.x - Math.floor(height / 2)) + this._getDoorOffset(height);
          break;
        case 'left':
          startY = coords.y + 1;
          startX = (coords.x - Math.floor(height / 2)) + this._getDoorOffset(height);
          break;
        case 'top':
          startY = (coords.y - Math.floor(width / 2)) + this._getDoorOffset(width);
          startX = coords.x + 1;
          break;
        case 'bottom':
          startY = (coords.y - Math.floor(width / 2)) + this._getDoorOffset(width);
          startX = coords.x - height;
          break;
        default:
          break;
      }
      // Exit if room would be outside matrix
      if (startX < 0 || startY < 0 || startX + height >= map.length || startY + width >= map[0].length) {
        continue;
      }
      // check if all spaces are clear
      for (let i = startX; i < startX + height; i++) {
        if (map[i].slice(startY, startY + width).every(tile => tile === tileType.WALL)) {
          numClear++;
        }
      }
      if (numClear === height) {
        this._fillRect(map, {x: startX, y: startY}, {x: height, y: width}, tileType.FLOOR);
        map[coords.x][coords.y] = tileType.FLOOR;
        return map;
      }
    }
  }

  _getDoorOffset(length) {
    return Math.floor((Math.random() * length) - Math.floor((length - 1 ) / 2));
  }

  _findWall(map) {
    const coords = {x: 0, y: 0};
    let wallDir = false;
    do {
      coords.x = Math.floor(Math.random() * map.length);
      coords.y = Math.floor(Math.random() * map[0].length);
      wallDir = this._isWall(map, coords);
    } while (!wallDir);
    
    return {coords: coords, openDir: wallDir};
  }

  _isWall(map, coords) {
    // return false if tile isn't wall
    if (map[coords.x][coords.y] !== tileType.WALL) { return false; }
    // left is open
    if (typeof map[coords.x - 1] !== 'undefined' && map[coords.x - 1][coords.y] === tileType.FLOOR) {
      return 'top';
    }
    // right is open
    if (typeof map[coords.x + 1] !== 'undefined' && map[coords.x + 1][coords.y] === tileType.FLOOR) {
      return 'bottom';
    }
    // top is open
    if (map[coords.x][coords.y - 1] === tileType.FLOOR) {
      return 'left';
    }
    // bottom is open
    if (map[coords.x][coords.y + 1] === tileType.FLOOR) {
      return 'right';
    }

    return false;
  }  
}

// const mapCreator = new Map();
// const map = mapCreator.createMap();
// console.log(map);

export default Map;