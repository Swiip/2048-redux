import React from 'react';
import {render} from 'react-dom';

import {store} from './redux/reducer';

import {BoardView} from './components/board';

import {chooseRandomTile} from './game/add';

import {start, addTile, update} from './redux/actions';

import './main.scss';
import './style.scss';

store.dispatch(start());
const tile = chooseRandomTile(store.getState().board);
store.dispatch(addTile(tile.row, tile.column, tile.value));
store.dispatch(update());

render(
  <BoardView/>,
  document.getElementById('root')
);
