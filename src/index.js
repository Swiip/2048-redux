import React from 'react';
import {render} from 'react-dom';

import {store} from './redux/2048';

import {BoardView} from './components/board';

import {chooseRandomTile} from './game/add';

import './main.scss';
import './style.scss';

store.dispatch({type: 'START'});
const tile = chooseRandomTile(store.getState().board);
store.dispatch({type: 'ADD_TILE', ...tile});
store.dispatch({type: 'UPDATE'});

render(
  <BoardView/>,
  document.getElementById('root')
);
