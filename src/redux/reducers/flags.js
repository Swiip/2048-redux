import {WON, LOST, CONTINUE, START} from '../actions';

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
    case WON: {
      return {...state, won: true};
    }
    case LOST: {
      return {...state, lost: true};
    }
    case CONTINUE: {
      return {...state, beyond: true};
    }
    default: {
      return state;
    }
  }
}
