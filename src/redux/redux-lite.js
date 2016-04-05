export function createStore(reducer, initState) {
  let state = initState;
  let subscribers = [];

  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    subscribers.forEach(subscriber => subscriber());
    return action;
  };
  const subscribe = listener => {
    subscribers.push(listener);
    return () => {
      subscribers = subscribers.slice(subscribers.indexOf(listener) + 1, 1);
    };
  };
  return {dispatch, subscribe, getState};
}
