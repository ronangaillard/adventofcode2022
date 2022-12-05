import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const map = [
      ['R', 'W', 'F', 'H', 'T', 'S'],
      ['W', 'Q', 'D', 'G', 'S'],
      ['W', 'T', 'B'],
      ['J', 'Z', 'Q', 'N', 'T', 'W', 'R', 'D'],
      ['Z', 'T', 'V', 'L', 'G', 'H', 'B', 'F'],
      ['G', 'S', 'B', 'V', 'C', 'T', 'P', 'L'],
      ['P', 'G', 'W', 'T', 'R', 'B', 'Z'],
      ['R', 'J', 'C', 'T', 'M', 'G', 'N'],
      ['W', 'B', 'G', 'L'],
    ];

    const [_, moves] = this.input.split('\n\n');

    moves.split('\n').forEach((move) => {
      const regexp = /move (\d+) from (\d) to (\d)/i;

      const result = move.match(regexp);

      const count = parseInt(result[1]);
      const origin = parseInt(result[2]) - 1;
      const destination = parseInt(result[3]) - 1;

      for (let i = 0; i < count; i++) {
        if (map[origin].length > 0) {
          const element = map[origin].shift();
          map[destination].unshift(element);
        }
      }
    });

    return map.map((x) => x[0]).join('');
  }

  public getFirstExpectedResult(): string {
    return 'ZRLJGSCTR';
  }

  public solveSecond(): string {
    const map = [
      ['R', 'W', 'F', 'H', 'T', 'S'],
      ['W', 'Q', 'D', 'G', 'S'],
      ['W', 'T', 'B'],
      ['J', 'Z', 'Q', 'N', 'T', 'W', 'R', 'D'],
      ['Z', 'T', 'V', 'L', 'G', 'H', 'B', 'F'],
      ['G', 'S', 'B', 'V', 'C', 'T', 'P', 'L'],
      ['P', 'G', 'W', 'T', 'R', 'B', 'Z'],
      ['R', 'J', 'C', 'T', 'M', 'G', 'N'],
      ['W', 'B', 'G', 'L'],
    ];

    const [_, moves] = this.input.split('\n\n');

    moves.split('\n').forEach((move) => {
      const regexp = /move (\d+) from (\d) to (\d)/i;

      const result = move.match(regexp);

      const count = parseInt(result[1]);
      const origin = parseInt(result[2]) - 1;
      const destination = parseInt(result[3]) - 1;

      const itemstoMove =
        count > map[origin].length ? map[origin].length : count;
      const pickedElements = map[origin].splice(0, itemstoMove);
      map[destination].unshift(...pickedElements);
    });

    return map.map((x) => x[0]).join('');
  }

  public getSecondExpectedResult(): string {
    return 'PRTTGRFPB';
  }
}
