import React, {Component} from 'react';

import {Cell} from './cell';
import {TileView} from './tile';
import {store} from '../redux/2048';

export class BoardView extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  handleKeyDown(event) {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      const direction = event.keyCode - 37;

      // MOVE
      // ADD
      // UPDATE
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));

    store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    return (
      <div className="board" tabIndex="1">
        {this.state.cells.map((row, i) => (
          <div key={i}>
            {row.map((row, i) => (
              <Cell key={i}/>
            ))}
          </div>
        ))}
        {this.state.tiles.filter(tile => tile.value !== 0).map((tile, i) => (
          <TileView key={i} tile={tile} />
        ))}
      </div>
    );
  }
}
