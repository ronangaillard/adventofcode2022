import Puzzle from '../../types/AbstractPuzzle';

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors

const symbolsTable = {
  X: 'A',
  Y: 'B',
  Z: 'C',
};

const winsAgainst = {
  A: 'C',
  B: 'A',
  C: 'B',
};

const losesAgainst = {
  C: 'A',
  A: 'B',
  B: 'C',
};

const scoreTable = {
  A: 1,
  B: 2,
  C: 3,
};

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const games = this.input.split('\n');
    const scores = games.map((game) => {
      const symbols = game.split(' ');
      symbols[1] = symbolsTable[symbols[1] as 'X' | 'Y' | 'Z'];

      let score = 0;

      // draw
      if (symbols[0] === symbols[1]) {
        score = 3;
      } else if (winsAgainst[symbols[1] as 'A' | 'B' | 'C'] === symbols[0]) {
        score = 6;
      }

      score += scoreTable[symbols[1] as 'A' | 'B' | 'C'];

      return score;
    });

    return scores.reduce((prev, current) => current + prev, 0).toString();
  }

  public getFirstExpectedResult(): string {
    return '13221';
  }

  public solveSecond(): string {
    const games = this.input.split('\n');
    const scores = games.map((game) => {
      const symbols = game.split(' ');

      let score = 0;

      // draw
      if (symbols[1] === 'Y') {
        score += 3; // draw
        score += scoreTable[symbols[0] as 'A' | 'B' | 'C']; // symbol
      }

      // lose
      if (symbols[1] === 'X') {
        score +=
          scoreTable[
            winsAgainst[symbols[0] as 'A' | 'B' | 'C'] as 'A' | 'B' | 'C'
          ];
      }

      // win
      if (symbols[1] === 'Z') {
        score += 6; // win
        score +=
          scoreTable[
            losesAgainst[symbols[0] as 'A' | 'B' | 'C'] as 'A' | 'B' | 'C'
          ];
      }

      return score;
    });

    return scores.reduce((prev, current) => current + prev, 0).toString();
  }

  public getSecondExpectedResult(): string {
    return '13131';
  }
}
