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
      return Object.assign({}, state, {won: true});
    }
    case LOST: {
      return Object.assign({}, state, {lost: true});
    }
    case CONTINUE: {
      return Object.assign({}, state, {beyond: true});
    }
    case RESTART: {
      return getInitialState();
    }
    default: {
      return state;
    }
  }
}
