import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const moves = this.input.split('\n').map((line) => {
      const [direction, count] = line.split(' ');
      return {
        direction,
        count: parseInt(count),
      };
    });

    const tailPosition = [0, 0];
    const headPosition = [0, 0];

    const tailPositionSet = new Set<string>();

    moves.forEach((move) => {
      for (let i = 0; i < move.count; i++) {
        if (move.direction === 'D') {
          headPosition[1] -= 1;
          if (tailPosition[1] - headPosition[1] > 1) {
            tailPosition[1] = headPosition[1] + 1;
            tailPosition[0] = headPosition[0];
          }
        } else if (move.direction === 'U') {
          headPosition[1] += 1;
          if (headPosition[1] - tailPosition[1] > 1) {
            tailPosition[1] = headPosition[1] - 1;
            tailPosition[0] = headPosition[0];
          }
        } else if (move.direction === 'L') {
          headPosition[0] -= 1;
          if (tailPosition[0] - headPosition[0] > 1) {
            tailPosition[0] = headPosition[0] + 1;
            tailPosition[1] = headPosition[1];
          }
        } else if (move.direction === 'R') {
          headPosition[0] += 1;
          if (headPosition[0] - tailPosition[0] > 1) {
            tailPosition[0] = headPosition[0] - 1;
            tailPosition[1] = headPosition[1];
          }
        }

        tailPositionSet.add(JSON.stringify(tailPosition));
      }
    });

    return tailPositionSet.size.toString();
  }

  public getFirstExpectedResult(): string {
    return '5930';
  }

  public solveSecond(): string {
    const moves = this.input.split('\n').map((line) => {
      const [direction, count] = line.split(' ');
      return {
        direction,
        count: parseInt(count),
      };
    });

    const knotPosition = Array.from({ length: 10 }, () => [0, 0]);

    const tailPositionSet = new Set<string>();

    moves.forEach((move) => {
      for (let i = 0; i < move.count; i++) {
        // move head
        if (move.direction === 'D') {
          knotPosition[0][1] -= 1;
        } else if (move.direction === 'U') {
          knotPosition[0][1] += 1;
        } else if (move.direction === 'L') {
          knotPosition[0][0] -= 1;
        } else if (move.direction === 'R') {
          knotPosition[0][0] += 1;
        }

        for (let i = 1; i < knotPosition.length; i++) {
          // DL
          if (
            knotPosition[i][1] - knotPosition[i - 1][1] > 1 &&
            knotPosition[i][0] - knotPosition[i - 1][0] > 1
          ) {
            knotPosition[i][1] = knotPosition[i - 1][1] + 1;
            knotPosition[i][0] = knotPosition[i - 1][0] + 1;
          }
          // DR
          else if (
            knotPosition[i][1] - knotPosition[i - 1][1] > 1 &&
            knotPosition[i - 1][0] - knotPosition[i][0] > 1
          ) {
            knotPosition[i][1] = knotPosition[i - 1][1] + 1;
            knotPosition[i][0] = knotPosition[i - 1][0] - 1;
          }
          // UL
          else if (
            knotPosition[i - 1][1] - knotPosition[i][1] > 1 &&
            knotPosition[i][0] - knotPosition[i - 1][0] > 1
          ) {
            knotPosition[i][1] = knotPosition[i - 1][1] - 1;
            knotPosition[i][0] = knotPosition[i - 1][0] + 1;
          }
          // UR
          else if (
            knotPosition[i - 1][1] - knotPosition[i][1] > 1 &&
            knotPosition[i - 1][0] - knotPosition[i][0] > 1
          ) {
            knotPosition[i][1] = knotPosition[i - 1][1] - 1;
            knotPosition[i][0] = knotPosition[i - 1][0] - 1;
          }
          // D
          else if (knotPosition[i][1] - knotPosition[i - 1][1] > 1) {
            knotPosition[i][1] = knotPosition[i - 1][1] + 1;
            knotPosition[i][0] = knotPosition[i - 1][0];
          }
          // U
          else if (knotPosition[i - 1][1] - knotPosition[i][1] > 1) {
            knotPosition[i][1] = knotPosition[i - 1][1] - 1;
            knotPosition[i][0] = knotPosition[i - 1][0];
          }
          // L
          else if (knotPosition[i][0] - knotPosition[i - 1][0] > 1) {
            knotPosition[i][0] = knotPosition[i - 1][0] + 1;
            knotPosition[i][1] = knotPosition[i - 1][1];
          }
          // R
          else if (knotPosition[i - 1][0] - knotPosition[i][0] > 1) {
            knotPosition[i][0] = knotPosition[i - 1][0] - 1;
            knotPosition[i][1] = knotPosition[i - 1][1];
          }
        }

        tailPositionSet.add(JSON.stringify(knotPosition[9]));
      }
    });

    return tailPositionSet.size.toString();
  }

  public getSecondExpectedResult(): string {
    return '2443';
  }

  private drawMap(knots: number[][]) {
    const mapSize = 12;
    const stringKnots = knots.map((knot) => JSON.stringify(knot));

    for (let y = mapSize; y > -mapSize; y--) {
      for (let x = -mapSize; x < mapSize; x++) {
        if (stringKnots.includes(JSON.stringify([x, y]))) {
          process.stdout.write(
            stringKnots
              .findIndex((item) => item === JSON.stringify([x, y]))
              .toString() ?? '?'
          );
        } else {
          process.stdout.write('.');
        }
      }
      console.log('');
    }
  }
}
