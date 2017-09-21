import Map from './mapCreator';

describe('test class Map', () => {
  const mapCreator = new Map();
  beforeEach(() => {

  });

  it('should create a random map', () => {
    let map = mapCreator.createMap();
    expect(map).toHaveLength(100);
  });
});