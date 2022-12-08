import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  map: number[][];

  isTreeVisible(x: number, y: number) {
    const treeHeight = this.map[x][y];

    let topVisible = 1;
    let bottomVisible = 1;
    let leftVisible = 1;
    let rightVisible = 1;

    // top
    for (let j = y - 1; j >= 0; j--) {
      if (this.map[x][j] >= treeHeight) {
        topVisible = 0;
      }
    }

    // bottom
    for (let j = y + 1; j < this.map[0].length; j++) {
      if (this.map[x][j] >= treeHeight) {
        bottomVisible = 0;
      }
    }

    // right
    for (let i = x + 1; i < this.map.length; i++) {
      if (this.map[i][y] >= treeHeight) {
        rightVisible = 0;
      }
    }

    // left
    for (let i = x - 1; i >= 0; i--) {
      if (this.map[i][y] >= treeHeight) {
        leftVisible = 0;
      }
    }

    if (topVisible + bottomVisible + rightVisible + leftVisible >= 1) {
      return 1;
    }

    return 0;
  }

  scenicScore(x: number, y: number) {
    const treeHeight = this.map[x][y];

    let topScore = 0;
    let bottomScore = 0;
    let leftscore = 0;
    let rightScore = 0;

    // top
    for (let j = y - 1; j >= 0; j--) {
      if (this.map[x][j] >= treeHeight) {
        topScore = y - j;
        break;
      }

      if (j === 0) {
        topScore = y;
      }
    }

    // bottom
    for (let j = y + 1; j < this.map[0].length; j++) {
      if (this.map[x][j] >= treeHeight) {
        bottomScore = j - y;
        break;
      }

      if (j === this.map[0].length - 1) {
        bottomScore = this.map[0].length - 1 - y;
      }
    }

    // right
    for (let i = x + 1; i < this.map.length; i++) {
      if (this.map[i][y] >= treeHeight) {
        rightScore = i - x;
        break;
      }

      if (i === this.map.length - 1) {
        rightScore = this.map.length - 1 - x;
      }
    }

    // left
    for (let i = x - 1; i >= 0; i--) {
      if (this.map[i][y] >= treeHeight) {
        leftscore = x - i;
        break;
      }

      if (i === 0) {
        leftscore = x;
      }
    }

    return topScore * bottomScore * leftscore * rightScore;
  }

  public solveFirst(): string {
    this.map = this.input
      .split('\n')
      .map((line) => line.split('').map((x) => parseInt(x)));

    let visibleTreeCount = 0;

    for (let y = 0; y < this.map[0].length; y += 1) {
      for (let x = 0; x < this.map.length; x += 1) {
        if (x === 0 || y === 0) {
          visibleTreeCount += 1;
        } else {
          visibleTreeCount += this.isTreeVisible(x, y);
        }
      }
    }
    return visibleTreeCount.toString();
  }

  public getFirstExpectedResult(): string {
    return '1779';
  }

  public solveSecond(): string {
    this.map = this.input
      .split('\n')
      .map((line) => line.split('').map((x) => parseInt(x)));

    let maxScenicScore = 0;

    for (let y = 0; y < this.map[0].length; y += 1) {
      for (let x = 0; x < this.map.length; x += 1) {
        const score = this.scenicScore(x, y);
        if (score > maxScenicScore) {
          maxScenicScore = score;
        }
      }
    }

    return maxScenicScore.toString();
  }

  public getSecondExpectedResult(): string {
    return '172224';
  }
}
