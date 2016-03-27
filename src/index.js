import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {reducer} from './redux/reducer';
import {Provider} from 'react-redux';
import {Board} from './redux/container';
import createLogger from 'redux-logger';

import './main.scss';
import './style.scss';

const store = createStore(reducer, applyMiddleware(createLogger()));

render(
  <Provider store={store}>
    <Board/>
  </Provider>,
  document.getElementById('root')
);
