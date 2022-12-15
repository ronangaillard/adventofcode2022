import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  private parsedInput: [number, number][] = [
    [3772068, 2853720], [4068389, 2345925],
    [78607, 2544104], [-152196, 4183739],
    [3239531, 3939220], [3568548, 4206192],
    [339124, 989831], [570292, 1048239],
    [3957534, 2132743], [3897332, 2000000],
    [1882965, 3426126], [2580484, 3654136],
    [1159443, 3861139], [2580484, 3654136],
    [2433461, 287013], [2088099, -190228],
    [3004122, 3483833], [2580484, 3654136],
    [3571821, 799602], [3897332, 2000000],
    [2376562, 1539540], [2700909, 2519581],
    [785113, 1273008], [570292, 1048239],
    [1990787, 38164], [2088099, -190228],
    [3993778, 3482849], [4247709, 3561264],
    [3821391, 3986080], [3568548, 4206192],
    [2703294, 3999015], [2580484, 3654136],
    [1448314, 2210094], [2700909, 2519581],
    [3351224, 2364892], [4068389, 2345925],
    [196419, 3491556], [-152196, 4183739],
    [175004, 138614], [570292, 1048239],
    [1618460, 806488], [570292, 1048239],
    [3974730, 1940193], [3897332, 2000000],
    [2995314, 2961775], [2700909, 2519581],
    [105378, 1513086], [570292, 1048239],
    [3576958, 3665667], [3568548, 4206192],
    [2712265, 2155055], [2700909, 2519581]];

  private stringInput: string[];

  private groupedParsedInput: [[number, number], [number, number]][] = [
    [[3772068, 2853720], [4068389, 2345925]],
    [[78607, 2544104], [-152196, 4183739]],
    [[3239531, 3939220], [3568548, 4206192]],
    [[339124, 989831], [570292, 1048239]],
    [[3957534, 2132743], [3897332, 2000000]],
    [[1882965, 3426126], [2580484, 3654136]],
    [[1159443, 3861139], [2580484, 3654136]],
    [[2433461, 287013], [2088099, -190228]],
    [[3004122, 3483833], [2580484, 3654136]],
    [[3571821, 799602], [3897332, 2000000]],
    [[2376562, 1539540], [2700909, 2519581]],
    [[785113, 1273008], [570292, 1048239]],
    [[1990787, 38164], [2088099, -190228]],
    [[3993778, 3482849], [4247709, 3561264]],
    [[3821391, 3986080], [3568548, 4206192]],
    [[2703294, 3999015], [2580484, 3654136]],
    [[1448314, 2210094], [2700909, 2519581]],
    [[3351224, 2364892], [4068389, 2345925]],
    [[196419, 3491556], [-152196, 4183739]],
    [[175004, 138614], [570292, 1048239]],
    [[1618460, 806488], [570292, 1048239]],
    [[3974730, 1940193], [3897332, 2000000]],
    [[2995314, 2961775], [2700909, 2519581]],
    [[105378, 1513086], [570292, 1048239]],
    [[3576958, 3665667], [3568548, 4206192]],
    [[2712265, 2155055], [2700909, 2519581]]];

  constructor() {
    super();
    this.stringInput = this.parsedInput.map(i => i.toString());
  }

  private manhattanDistance(a: [number, number], b: [number, number]) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  };

  private noBeaconPositionsAtY(y: number) {
    const noBeaconCoords = new Set<string>();

    for (let i = 0; i < this.parsedInput.length; i += 2) {
      const distance = this.manhattanDistance(this.parsedInput[i], this.parsedInput[i + 1]) + 1;

      const yDistance = Math.abs(y - this.parsedInput[i][1]);

      for (let x = 0; x <= distance - yDistance - 1; x++) {
        if (!this.stringInput.includes([this.parsedInput[i][0] + x, y].toString())) {
          noBeaconCoords.add([this.parsedInput[i][0] + x, y].toString());
        }

        if (!this.stringInput.includes([this.parsedInput[i][0] - x, y].toString())) {
          noBeaconCoords.add([this.parsedInput[i][0] - x, y].toString());
        }
      }
    }

    return noBeaconCoords.size;
  }

  public solveFirst(): string {
    return this.noBeaconPositionsAtY(2000000).toString();
  }

  public getFirstExpectedResult(): string {
    return '5299855';
  }

  private computeAdjacents(sensor: [number, number], beacon: [number, number]) {
    const adjacents: [number, number][] = [];
    const manhattanDistance = this.manhattanDistance(sensor, beacon);

    for (let y = sensor[1] - manhattanDistance - 1; y < sensor[1] + manhattanDistance + 2; y++) {
      const xOffset = manhattanDistance - Math.abs(sensor[1] - y) + 1;
      adjacents.push([sensor[0] - xOffset, y]);
      if (xOffset > 0) {
        adjacents.push([sensor[0] + xOffset, y]);
      }
    }

    return adjacents;
  }

  private isWithinDistance(sensor: [number, number], beacon: [number, number], coord: [number, number]) {
    return Math.abs(coord[0] - sensor[0]) + Math.abs(coord[1] - sensor[1]) <= this.manhattanDistance(sensor, beacon);
  }

  public solveSecond(): string {
    // the uniq point must be adjacent to the diamong perimeter
    // (Step 1) let's list all adjacent points
    // (Step 2) and then remove all points that are in other diamonds manhattan distance


    const pos = this.groupedParsedInput.map(inp => this.computeAdjacents(inp[0], inp[1]).filter(coords => coords[0] >= 0 && coords[0] <= 4000000 && coords[1] >= 0 && coords[1] <= 4000000).find(a => !this.groupedParsedInput.some(b => this.isWithinDistance(b[0], b[1], a)))).filter(Boolean);


    return (pos[0][0] * 4000000 + pos[0][1]).toString();
  }

  public getSecondExpectedResult(): string {
    return '13615843289729';
  }
}

