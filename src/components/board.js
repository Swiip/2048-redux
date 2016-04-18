import _ from 'lodash';
import React, {Component, PropTypes} from 'react';

import {Cell} from './cell';
import {TileView} from './tile';
import {store} from '../redux/2048';
import {chooseRandomTile} from '../game/add';

export class BoardView extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  handleKeyDown(event) {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      const direction = event.keyCode - 37;
      store.dispatch({type: 'MOVE', direction});
      const {board, changed} = store.getState();
      if(changed) {
        const tile = chooseRandomTile(board);
        store.dispatch({type: 'ADD_TILE', ...tile});
      }
      store.dispatch({type: 'UPDATE'});
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));

    this.unsubscribeListener = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));

    _.invoke(this, 'unsubscribeListener');
  }

  render() {
    const merged = _(this.state.board).flatten().map('merged').compact().flatten().value();
    const cells = _(this.state.board).flatten().value();
    const tiles = _(merged).concat(cells).filter('value').value();
    return (
      <div className="board" tabIndex="1">
        {this.state.board.map((row, i) => (
          <div key={i}>
            {row.map((row, i) => (
              <Cell key={i}/>
            ))}
          </div>
        ))}
        {tiles.map((tile, i) => (
          <TileView key={i} tile={tile} />
        ))}
      </div>
    );
  }
}
