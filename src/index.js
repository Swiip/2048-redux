import React from 'react';
import {render} from 'react-dom';

import {BoardView} from './components/board';

import './main.scss';
import './style.scss';

// START
// ADD TILE
// UPDATE

render(
  <BoardView/>,
  document.getElementById('root')
);
