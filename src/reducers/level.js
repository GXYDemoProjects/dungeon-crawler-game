import * as gameType from '../constants/gameType';

const level = (state = 0, action) => {
  switch (action.type) {
    case gameType.INCREASE_LEVEL:
      console.log('increasing level!');
      return state + 1;
    case gameType.RESET_LEVEL:
      return 0;    
    default:
      return state;
  }
};
export default level;