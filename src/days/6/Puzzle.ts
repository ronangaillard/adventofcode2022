import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const chars = this.input.split('');

    let i = 3;

    for (; i < chars.length; i++) {
      const sequence = [chars[i - 3], chars[i - 2], chars[i - 1], chars[i]];
      const uniqSequence = new Set(sequence);
      if (uniqSequence.size === sequence.length) {
        break;
      }
    }
    return (i + 1).toString();
  }

  public getFirstExpectedResult(): string {
    return '1238';
  }

  public solveSecond(): string {
    const chars = this.input.split('');

    let i = 13;

    for (; i < chars.length; i++) {
      const sequence = chars.slice(i - 13, i + 1);
      const uniqSequence = new Set(sequence);
      if (uniqSequence.size === sequence.length) {
        break;
      }
    }

    return (i + 1).toString();
  }

  public getSecondExpectedResult(): string {
    return '3037';
  }
}
