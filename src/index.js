import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';

import {reducer} from './redux/reducer';
import {Board} from './redux/container';
import {start, addTile, update} from './redux/actions';

import './main.scss';
import './style.scss';

const store = createStore(
  reducer,
  applyMiddleware(createLogger())
);

store.dispatch(start());
store.dispatch(addTile(store.getState().board));
store.dispatch(update());

render(
  <Provider store={store}>
    <Board/>
  </Provider>,
  document.getElementById('root')
);
