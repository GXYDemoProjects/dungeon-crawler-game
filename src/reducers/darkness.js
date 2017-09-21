import * as gameType from '../constants/gameType';

const darkness = (state = true, action) => {
  switch (action.type) {
    case gameType.TOGGLE_DARKNESS:
      return {
        ...state, 
        darkness: !state[darkness]
      } 
    default:
      return state;
  }
};
export default darkness;