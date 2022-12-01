import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const max = this.input
      .split('\n\n')
      .map((lines) =>
        lines.split('\n').reduce((prev, current) => prev + parseInt(current), 0)
      )
      .filter((x) => x === x) // filters Nan (last array item)
      .reduce((a, b) => Math.max(a, b), 0);

    return max.toString();
  }
  public solveSecond(): string {
    const orderedCalories = this.input
      .split('\n\n')
      .map((lines) =>
        lines.split('\n').reduce((prev, current) => prev + parseInt(current), 0)
      )
      .filter((x) => x === x) // filters Nan (last array item)
      .sort((a, b) => b - a);

    return (
      orderedCalories[0] +
      orderedCalories[1] +
      orderedCalories[2]
    ).toString();
  }

  public getFirstExpectedResult(): string {
    return '66616';
  }

  public getSecondExpectedResult(): string {
    return '199172';
  }
}
