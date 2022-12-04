import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const lines = this.input.split('\n');
    let overlaps = 0;

    lines.forEach((line) => {
      const segments = line.split(',');
      const [a1, b1] = segments[0].split('-').map((x) => parseInt(x));
      const [a2, b2] = segments[1].split('-').map((x) => parseInt(x));

      if ((a1 <= a2 && b1 >= b2) || (a2 <= a1 && b2 >= b1)) {
        overlaps += 1;
      }
    });

    return overlaps.toString();
  }

  public getFirstExpectedResult(): string {
    return '450';
  }

  public solveSecond(): string {
    const lines = this.input.split('\n');
    let overlaps = 0;

    lines.forEach((line) => {
      const segments = line.split(',');
      const [a1, b1] = segments[0].split('-').map((x) => parseInt(x));
      const [a2, b2] = segments[1].split('-').map((x) => parseInt(x));

      if ((a1 <= a2 && b1 >= a2) || (a2 <= a1 && b2 >= a1)) {
        overlaps += 1;
      }
    });

    return overlaps.toString();
  }

  public getSecondExpectedResult(): string {
    return '837';
  }
}
