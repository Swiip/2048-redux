function createStore(reducer) {
  let state;
  const listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    return action;
  };

  return {getState, dispatch, subscribe};
}

function reducer(state = 0, action) {
  switch (action.type) {
    case 'ADD': {
      return ++state;
    }
    case 'SUB': {
      return --state;
    }
    default: {
      return state;
    }
  }
}

const store = createStore(reducer);
store.dispatch({type: 'ADD'});
console.log(store.getState());
store.dispatch({type: 'ADD'});
console.log(store.getState());
store.dispatch({type: 'ADD'});
console.log(store.getState());
store.dispatch({type: 'SUB'});
console.log(store.getState());
store.dispatch({type: 'SUB'});
console.log(store.getState());
