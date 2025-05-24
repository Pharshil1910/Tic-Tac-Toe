import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  board: string[][] = [];
  currentPlayer: string = 'X';
  winner: string | null = null;
  isDraw: boolean = false;
  moves: number = 0;
  scores = { X: 0, O: 0 };
  gameMode: 'human' | 'computer' = 'human';
  isComputerThinking: boolean = false;
  winningCells: {row: number, col: number}[] = [];

  constructor() {
    this.resetGame();
  }

  resetGame() {
    this.board = Array.from({ length: 3 }, () => Array(3).fill(''));
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
    this.moves = 0;
    this.isComputerThinking = false;
    this.winningCells = [];
  }

  setGameMode(mode: 'human' | 'computer') {
    this.gameMode = mode;
    this.resetGame();
  }

  makeMove(row: number, col: number) {
    if (this.board[row][col] || this.winner || this.isDraw || this.isComputerThinking) return;
    
    this.board[row][col] = this.currentPlayer;
    this.moves++;
    
    const result = this.checkWinner(row, col);
    if (result.win) {
      this.winner = this.currentPlayer;
      this.winningCells = result.cells;
      this.scores[this.currentPlayer as 'X' | 'O']++;
    } else if (this.moves === 9) {
      this.isDraw = true;
    } else {
      if (this.gameMode === 'computer') {
        this.currentPlayer = 'O';
        this.isComputerThinking = true;
        setTimeout(() => this.makeComputerMove(), 500);
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  makeComputerMove() {
    if (this.winner || this.isDraw) return;

    const move = this.findBestMove();
    if (move) {
      this.board[move.row][move.col] = 'O';
      this.moves++;
      
      const result = this.checkWinner(move.row, move.col);
      if (result.win) {
        this.winner = 'O';
        this.winningCells = result.cells;
        this.scores.O++;
      } else if (this.moves === 9) {
        this.isDraw = true;
      }
    }
    this.isComputerThinking = false;
    this.currentPlayer = 'X';
  }

  findBestMove(): { row: number; col: number } | null {
    // For the first move, use a specific strategy
    if (this.moves === 0) {
      // Always take center or corner on first move
      return this.getOptimalFirstMove();
    }

    // For second move (if X took center)
    if (this.moves === 1 && this.board[1][1] === 'X') {
      return this.getOptimalSecondMove();
    }

    // Check for immediate winning move
    const winningMove = this.findWinningMove('O');
    if (winningMove) return winningMove;

    // Check for blocking move
    const blockingMove = this.findWinningMove('X');
    if (blockingMove) return blockingMove;

    // Use perfect play strategy for remaining moves
    return this.getPerfectPlayMove();
  }

  getOptimalFirstMove(): { row: number; col: number } {
    // If center is available, take it
    if (!this.board[1][1]) {
      return { row: 1, col: 1 };
    }
    
    // Otherwise take a corner
    const corners = [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 2 }
    ];
    return corners[Math.floor(Math.random() * corners.length)];
  }

  getOptimalSecondMove(): { row: number; col: number } {
    // If X took center, take a corner
    const corners = [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 2 }
    ];
    const availableCorners = corners.filter(({ row, col }) => !this.board[row][col]);
    return availableCorners[0];
  }

  getPerfectPlayMove(): { row: number; col: number } | null {
    const availableMoves = this.getAvailableMoves();
    let bestScore = -Infinity;
    let bestMove = null;
    let bestMoves: { row: number; col: number }[] = [];

    // Evaluate each move
    for (const move of availableMoves) {
      this.board[move.row][move.col] = 'O';
      const score = this.evaluatePosition();
      this.board[move.row][move.col] = '';

      if (score > bestScore) {
        bestScore = score;
        bestMoves = [move];
      } else if (score === bestScore) {
        bestMoves.push(move);
      }
    }

    // If multiple moves have the same score, choose one that creates a fork
    const forkMove = this.findForkMove(bestMoves);
    if (forkMove) return forkMove;

    // Otherwise return a random move from the best moves
    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
  }

  findForkMove(moves: { row: number; col: number }[]): { row: number; col: number } | null {
    for (const move of moves) {
      this.board[move.row][move.col] = 'O';
      const winningPaths = this.countWinningPaths('O');
      this.board[move.row][move.col] = '';

      if (winningPaths >= 2) {
        return move;
      }
    }
    return null;
  }

  countWinningPaths(player: 'X' | 'O'): number {
    let paths = 0;
    
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (this.board[i].filter(cell => cell === player).length === 2 &&
          this.board[i].some(cell => cell === '')) {
        paths++;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if ([this.board[0][i], this.board[1][i], this.board[2][i]]
          .filter(cell => cell === player).length === 2 &&
          [this.board[0][i], this.board[1][i], this.board[2][i]].some(cell => cell === '')) {
        paths++;
      }
    }

    // Check diagonals
    if ([this.board[0][0], this.board[1][1], this.board[2][2]]
        .filter(cell => cell === player).length === 2 &&
        [this.board[0][0], this.board[1][1], this.board[2][2]].some(cell => cell === '')) {
      paths++;
    }
    if ([this.board[0][2], this.board[1][1], this.board[2][0]]
        .filter(cell => cell === player).length === 2 &&
        [this.board[0][2], this.board[1][1], this.board[2][0]].some(cell => cell === '')) {
      paths++;
    }

    return paths;
  }

  evaluatePosition(): number {
    let score = 0;
    
    // Check for immediate win
    if (this.checkGameState() === 'O') return 1000;
    if (this.checkGameState() === 'X') return -1000;
    if (this.checkGameState() === 'draw') return 0;

    // Evaluate rows
    for (let i = 0; i < 3; i++) {
      score += this.evaluateLine(this.board[i]);
    }

    // Evaluate columns
    for (let i = 0; i < 3; i++) {
      score += this.evaluateLine([this.board[0][i], this.board[1][i], this.board[2][i]]);
    }

    // Evaluate diagonals
    score += this.evaluateLine([this.board[0][0], this.board[1][1], this.board[2][2]]);
    score += this.evaluateLine([this.board[0][2], this.board[1][1], this.board[2][0]]);

    // Prefer center position
    if (this.board[1][1] === 'O') score += 3;
    if (this.board[1][1] === 'X') score -= 3;

    // Prefer corners
    const corners = [
      this.board[0][0], this.board[0][2],
      this.board[2][0], this.board[2][2]
    ];
    corners.forEach(cell => {
      if (cell === 'O') score += 2;
      if (cell === 'X') score -= 2;
    });

    return score;
  }

  evaluateLine(line: string[]): number {
    let score = 0;
    const oCount = line.filter(cell => cell === 'O').length;
    const xCount = line.filter(cell => cell === 'X').length;
    const emptyCount = line.filter(cell => cell === '').length;

    // Two in a row with empty cell
    if (oCount === 2 && emptyCount === 1) score += 10;
    if (xCount === 2 && emptyCount === 1) score -= 10;

    // One in a row with two empty cells
    if (oCount === 1 && emptyCount === 2) score += 1;
    if (xCount === 1 && emptyCount === 2) score -= 1;

    return score;
  }

  findWinningMove(player: 'X' | 'O'): { row: number; col: number } | null {
    const availableMoves = this.getAvailableMoves();
    
    for (const move of availableMoves) {
      this.board[move.row][move.col] = player;
      const result = this.checkWinner(move.row, move.col);
      this.board[move.row][move.col] = '';
      
      if (result.win) {
        return move;
      }
    }
    
    return null;
  }

  getAvailableMoves(): { row: number; col: number }[] {
    const moves: { row: number; col: number }[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!this.board[i][j]) {
          moves.push({ row: i, col: j });
        }
      }
    }
    return moves;
  }

  checkGameState(): 'X' | 'O' | 'draw' | null {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
        return this.board[i][0] as 'X' | 'O';
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (this.board[0][i] && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
        return this.board[0][i] as 'X' | 'O';
      }
    }

    // Check diagonals
    if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      return this.board[0][0] as 'X' | 'O';
    }
    if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
      return this.board[0][2] as 'X' | 'O';
    }

    // Check for draw
    if (this.moves === 9) {
      return 'draw';
    }

    return null;
  }

  checkWinner(row: number, col: number): { win: boolean; cells: {row: number, col: number}[] } {
    const player = this.currentPlayer;
    const cells: {row: number, col: number}[] = [];

    // Check row
    if (this.board[row].every(cell => cell === player)) {
      for (let i = 0; i < 3; i++) cells.push({row, col: i});
      return { win: true, cells };
    }

    // Check column
    if (this.board.every(r => r[col] === player)) {
      for (let i = 0; i < 3; i++) cells.push({row: i, col});
      return { win: true, cells };
    }

    // Check main diagonal
    if (row === col && this.board.every((r, i) => r[i] === player)) {
      for (let i = 0; i < 3; i++) cells.push({row: i, col: i});
      return { win: true, cells };
    }

    // Check anti-diagonal
    if (row + col === 2 && this.board.every((r, i) => r[2 - i] === player)) {
      for (let i = 0; i < 3; i++) cells.push({row: i, col: 2 - i});
      return { win: true, cells };
    }

    return { win: false, cells: [] };
  }

  getStatusMessage(): string {
    if (this.winner) return `Player ${this.winner} wins!`;
    if (this.isDraw) return "It's a draw!";
    if (this.isComputerThinking) return "Computer is thinking...";
    return `Player ${this.currentPlayer}'s turn`;
  }

  isWinningCell(row: number, col: number): boolean {
    return this.winningCells.some(cell => cell.row === row && cell.col === col);
  }
}

