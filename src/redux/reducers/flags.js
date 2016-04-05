import {WON, LOST, CONTINUE, RESTART} from '../actions';

function getInitialState() {
  return {
    won: false,
    beyond: false,
    lost: false
  };
}

export function flags(state = getInitialState(), action) {
  switch (action.type) {
    case WON: {
      return {...state, won: true};
    }
    case LOST: {
      return {...state, lost: true};
    }
    case CONTINUE: {
      return {...state, beyond: true};
    }
    case RESTART: {
      return getInitialState();
    }
    default: {
      return state;
    }
  }
}
