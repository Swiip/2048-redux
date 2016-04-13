let tileId = 0;

export function createTile(value, row, column) {
  // const newTile = {
  return {
    id: tileId++,
    value: value || 0,
    row: row || -1,
    column: column || -1,
    oldRow: -1,
    oldColumn: -1,
    // markForDeletion: false,
    mergedInto: null,
    classes: []
  };
  // tiles.push(newTile);
  // return newTile;
}

export function isNew(tile) {
  return tile.oldRow === -1 && !tile.mergedInto;
}

export function hasMoved(tile) {
  return (
    fromRow(tile) !== -1 &&
    (fromRow(tile) !== toRow(tile) || fromColumn(tile) !== toColumn(tile))
  ) || tile.mergedInto;
}

function fromRow(tile) {
  return tile.mergedInto ? tile.row : tile.oldRow;
}

function fromColumn(tile) {
  return tile.mergedInto ? tile.column : tile.oldColumn;
}

function toRow(tile) {
  return tile.mergedInto ? tile.mergedInto.row : tile.row;
}

function toColumn(tile) {
  return tile.mergedInto ? tile.mergedInto.column : tile.column;
}

export function updatePositions(cells) {
  return cells.map((row, rowIndex) => {
    return row.map((column, columnIndex) => {
      return {
        cell: {
          ...column.cell,
          oldRow: column.cell.row,
          oldColumn: column.cell.column,
          row: rowIndex,
          column: columnIndex
        },
        merged: column.merged.map(tile => ({
          ...tile,
          mergedInto: {
            row: rowIndex,
            column: columnIndex
          }
        }))
      };
    });
  });
}

// export function setPositions(cells) {
//   cells.forEach((row, rowIndex) => {
//     row.forEach((tile, columnIndex) => {
//       tile.oldRow = tile.row;
//       tile.oldColumn = tile.column;
//       tile.row = rowIndex;
//       tile.column = columnIndex;
//       tile.markForDeletion = false;
//     });
//   });
// }

export function updateClasses(cells) {
  const tileUpdater = tile => {
    tile = {...tile};
    tile.classes = ['tile'];
    tile.classes.push(`tile${tile.value}`);
    if (!tile.mergedInto) {
      tile.classes.push(`position_${tile.row}_${tile.column}`);
    }
    if (tile.mergedInto) {
      tile.classes.push('merged');
    }
    if (isNew(tile)) {
      tile.classes.push('new');
    }
    if (hasMoved(tile)) {
      tile.classes.push(`row_from_${fromRow(tile)}_to_${toRow(tile)}`);
      tile.classes.push(`column_from_${fromColumn(tile)}_to_${toColumn(tile)}`);
      tile.classes.push('isMoving');
    }
    return tile;
  };
  return cells.map(row => {
    return row.map(column => {
      return {
        cell: tileUpdater(column.cell),
        merged: column.merged.map(tileUpdater)
      };
    });
  });
}
