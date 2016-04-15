import {HAS_WON, HAS_LOST, CONTINUE, START} from '../actions';
import {hasWon, hasLost} from '../../game/end';

function getInitialState() {
  return {
    won: false,
    beyond: false,
    lost: false
  };
}

export function flags(state = getInitialState(), action) {
  switch (action.type) {
    case START: {
      return getInitialState();
    }
    case HAS_WON: {
      return {...state, won: hasWon(action.board)};
    }
    case HAS_LOST: {
      return {...state, lost: hasLost(action.board)};
    }
    case CONTINUE: {
      return {...state, beyond: true};
    }
    default: {
      return state;
    }
  }
}
