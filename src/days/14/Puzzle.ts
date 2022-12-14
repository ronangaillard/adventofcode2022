import Puzzle from '../../types/AbstractPuzzle';

enum Item {
  Sand,
  Rock
}

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const coords = this.input.split('\n');
    const map: Item[][] = [];

    let lowestPoint = 0;

    coords.forEach(line => {
      const regexp = /(\d+),(\d+)/g;
      const points = line.match(regexp);

      let previousPoint: [number, number] = undefined;

      points.forEach(point => {

        const [x, y] = [parseInt(point.split(',')[0]), parseInt(point.split(',')[1])];

        if (y > lowestPoint) {
          lowestPoint = y;
        }

        if (previousPoint === undefined) {
          previousPoint = [x, y];
        } else {
          if (map[x] === undefined) {
            map[x] = [];
          }

          if (y === previousPoint[1]) {
            for (let i = Math.min(x, previousPoint[0]); i <= Math.max(x, previousPoint[0]); i += 1) {
              if (map[i] === undefined) {
                map[i] = [];
              }
              map[i][y] = Item.Rock;

            }
          }

          if (x === previousPoint[0]) {
            for (let i = Math.min(y, previousPoint[1]); i <= Math.max(y, previousPoint[1]); i += 1) {
              map[x][i] = Item.Rock;
            }
          }
          previousPoint = [x, y];
        }
      });
    });

    let sandCount = 0;

    while (true) {
      let sandPositon = [500, 0];
      sandCount += 1;

      while (true) {
        if (sandPositon[1] > lowestPoint) {

          return (sandCount - 1).toString();
        }

        if (map[sandPositon[0]] === undefined) {
          map[sandPositon[0]] = [];
        }

        if (map[sandPositon[0] - 1] === undefined) {
          map[sandPositon[0] - 1] = [];
        }

        if (map[sandPositon[0] + 1] === undefined) {
          map[sandPositon[0] + 1] = [];
        }

        if (map[sandPositon[0]][sandPositon[1] + 1] === undefined) {
          sandPositon = [sandPositon[0], sandPositon[1] + 1];
          continue;
        } else
          if (map[sandPositon[0] - 1][sandPositon[1] + 1] === undefined) {
            sandPositon = [sandPositon[0] - 1, sandPositon[1] + 1];
            continue;
          } else {
            if (map[sandPositon[0] + 1][sandPositon[1] + 1] === undefined) {
              sandPositon = [sandPositon[0] + 1, sandPositon[1] + 1];
              continue;
            } else {
              map[sandPositon[0]][sandPositon[1]] = Item.Sand;
              break;
            }
          }
      }
    }

    return '-1';
  }

  public getFirstExpectedResult(): string {
    return '1001';
  }

  public solveSecond(): string {
    const coords = this.input.split('\n');
    const map: Item[][] = [];

    let lowestPoint = 0;

    coords.forEach(line => {
      const regexp = /(\d+),(\d+)/g;
      const points = line.match(regexp);

      let previousPoint: [number, number] = undefined;

      points.forEach(point => {

        const [x, y] = [parseInt(point.split(',')[0]), parseInt(point.split(',')[1])];

        if (y > lowestPoint) {
          lowestPoint = y;
        }

        if (previousPoint === undefined) {
          previousPoint = [x, y];
        } else {
          if (map[x] === undefined) {
            map[x] = [];
          }

          if (y === previousPoint[1]) {
            for (let i = Math.min(x, previousPoint[0]); i <= Math.max(x, previousPoint[0]); i += 1) {
              if (map[i] === undefined) {
                map[i] = [];
              }
              map[i][y] = Item.Rock;

            }
          }

          if (x === previousPoint[0]) {
            for (let i = Math.min(y, previousPoint[1]); i <= Math.max(y, previousPoint[1]); i += 1) {
              map[x][i] = Item.Rock;
            }
          }
          previousPoint = [x, y];
        }
      });
    });

    let sandCount = 0;

    while (true) {
      let sandPositon = [500, 0];
      sandCount += 1;

      while (true) {
        if (map[sandPositon[0]] === undefined) {
          map[sandPositon[0]] = [];
        }
        if (map[sandPositon[0] - 1] === undefined) {
          map[sandPositon[0] - 1] = [];
        }
        if (map[sandPositon[0] + 1] === undefined) {
          map[sandPositon[0] + 1] = [];
        }


        if (sandPositon[1] === lowestPoint + 1) {
          map[sandPositon[0]][sandPositon[1]] = Item.Sand;
          break;
        }

        if (map[sandPositon[0]][sandPositon[1] + 1] === undefined) {
          sandPositon = [sandPositon[0], sandPositon[1] + 1];
          continue;
        } else
          if (map[sandPositon[0] - 1][sandPositon[1] + 1] === undefined) {
            sandPositon = [sandPositon[0] - 1, sandPositon[1] + 1];
            continue;
          } else {
            if (map[sandPositon[0] + 1][sandPositon[1] + 1] === undefined) {
              sandPositon = [sandPositon[0] + 1, sandPositon[1] + 1];
              continue;
            } else {
              map[sandPositon[0]][sandPositon[1]] = Item.Sand;
              break;
            }
          }
      }

      if (sandPositon[0] === 500 && sandPositon[1] === 0) {
        return (sandCount).toString();
      }

    }

    return '-1';
  }

  public getSecondExpectedResult(): string {
    return '27976';
  }
}
