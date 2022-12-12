import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {

  private getLevel = (item: string) => {
    return 'SabcdefghijklmnopqrstuvwxyzE'.indexOf(item);
  };

  private getNeighbours = ([x, y]: [number, number], map: number[][]) => {
    return [[x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y]].filter((coords => coords[0] >= 0 && coords[1] >= 0 && coords[1] < map.length && coords[0] < map[0].length));
  };

  private explore = (map: number[][], start: [number, number], end: [number, number]): number => {
    const queue: [[number, number], number][] = [[start, 0]];
    const visited = new Set<string>();
    while (queue.length) {
      const [current, stepCount] = queue.shift()!;

      if (visited.has(current.toString())) {
        continue;
      }
      visited.add(current.toString());
      if (current.toString() === end.toString()) {
        return stepCount;
      }

      queue.push(
        ...this.getNeighbours(current, map)
          .filter((coord) => map[coord[1]][coord[0]] <= map[current[1]][current[0]] + 1)
          .map((coord) => [coord, stepCount + 1] as [[number, number], number])
      );
    }

    return Infinity;
  };

  public solveFirst(): string {
    const map = this.input.split('\n').map(line => line.split('').map(this.getLevel));

    // dirty find of start and end
    let startx = 0;
    let starty = 0;

    for (; starty < map.length; starty += 1) {
      for (startx = 0; startx < map[0].length; startx += 1) {
        if (map[starty][startx] === 0) {
          break;
        }
      }
      if (map[starty][startx] === 0) {
        break;
      }
    }

    let endx = 0;
    let endy = 0;

    for (; endy < map.length; endy += 1) {
      for (endx = 0; endx < map[0].length; endx += 1) {
        if (map[endy][endx] === 27) {
          break;
        }
      }
      if (map[endy][endx] === 27) {
        break;
      }
    }
    // end of dirty

    return this.explore(map, [startx, starty], [endx, endy]).toString();
  }

  public getFirstExpectedResult(): string {
    return '534';
  }

  public solveSecond(): string {
    const map = this.input.split('\n').map(line => line.split('').map(this.getLevel));

    let endx = 0;
    let endy = 0;

    for (; endy < map.length; endy += 1) {
      for (endx = 0; endx < map[0].length; endx += 1) {
        if (map[endy][endx] === 27) {
          break;
        }
      }
      if (map[endy][endx] === 27) {
        break;
      }
    }
    // end of dirty

    const lengths = [] as number[];

    for (let x = 0; x < map[0].length; x += 1) {
      for (let y = 0; y < map.length; y += 1) {
        // a
        if (map[y][x] === 1) {
          lengths.push(this.explore(map, [x, y], [endx, endy]));
        }
      }
    }

    return Math.min(...lengths).toString();
  }

  public getSecondExpectedResult(): string {
    return '525';
  }
}
