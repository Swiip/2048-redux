import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import {board} from './redux/reducers/board';
import {flags} from './redux/reducers/flags';
import {Board} from './redux/container';
import {start} from './redux/actions';

import './main.scss';
import './style.scss';

const store = createStore(
  combineReducers({board, flags}),
  applyMiddleware(createLogger(), thunk)
);

store.dispatch(start());

render(
  <Provider store={store}>
    <Board/>
  </Provider>,
  document.getElementById('root')
);
