const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.json())
app.use(cors());

function solveSudoku(grid) {
  const n = grid.length;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValidMove(grid, row, col, num) {
  const n = grid.length;
  for (let i = 0; i < n; i++) {
    if (grid[row][i] === num || grid[i][col] === num) {
      return false;
    }
  }

  const subgridSize = Math.sqrt(n);
  const startRow = Math.floor(row / subgridSize) * subgridSize;
  const startCol = Math.floor(col / subgridSize) * subgridSize;

  for (let i = 0; i < subgridSize; i++) {
    for (let j = 0; j < subgridSize; j++) {
      if (grid[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}
function generateSudokuGrid() {
  const n = 9; // Size of the Sudoku grid (9x9)
  const grid = new Array(n).fill(null).map(() => new Array(n).fill(0));

  // Fill the diagonal sub-grids
  for (let i = 0; i < n; i += 3) {
    fillDiagonalSubgrid(grid, i, i);
  }

  // Solve the Sudoku grid
  solveSudoku(grid);

  // Shuffle rows and columns to randomize the solution
  shuffleRows(grid);
  transpose(grid);
  shuffleRows(grid);
  transpose(grid);

  return grid;
}
function fillDiagonalSubgrid(grid, row, col) {
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      grid[row + i][col + j] = nums.pop();
    }
  }
}
function shuffleRows(grid) {
  for (let i = grid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [grid[i], grid[j]] = [grid[j], grid[i]];
  }
}
function transpose(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = i + 1; j < grid.length; j++) {
      [grid[i][j], grid[j][i]] = [grid[j][i], grid[i][j]];
    }
  }
}
// Function to shuffle an array in-place
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function createPuzzle(diff){
  let puzzle = generateSudokuGrid();
  for(let i=0;i<9;i++){
    for(let j=0;j<9;j++){
      if(Math.random()<diff){
        puzzle[i][j]='';
      }
    }
  }
  return puzzle;
}
function validateSudokuGrid(grid) {
  const n = 9; // Size of the Sudoku grid (9x9)

  function hasUniqueValues(arr) {
    const seen = new Set();
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if (num === 0) {
        return false;
      }
      if (num < 1 || num > 9 || seen.has(num)) {
        return false;
      }
      seen.add(num);
    }
    return true;
  }

  // Check rows and columns
  for (let i = 0; i < n; i++) {
    const rowStart = i * n;
    const row = grid.slice(rowStart, rowStart + n);
    
    const col = [];
    for (let j = i; j < grid.length; j += n) {
      col.push(grid[j]);
    }

    if (!hasUniqueValues(row) || !hasUniqueValues(col)) {
      return false;
    }
  }

  return true;
}


app.post('/validate-sudoku', (req, res) => {
  const { grid } = req.body;
  const isValid = validateSudokuGrid(grid);
  if (isValid) {
    res.json({ message: 'Valid solution' });
  } else {
    res.status(400).json({ message: 'Invalid solution' });
  }
});

app.get('/sudoku-puzzle/easy', (req, res) => {
  const puzzle = createPuzzle(0.2);
  res.json(puzzle);
});
app.get('/sudoku-puzzle/medium', (req, res) => {
  const puzzle = createPuzzle(0.5);
  res.json(puzzle);
});
app.get('/sudoku-puzzle/hard', (req, res) => {
  const puzzle = createPuzzle(0.8);
  res.json(puzzle);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});