import Puzzle from '../../types/AbstractPuzzle';
import cloneDeep = require('lodash.clonedeep');

export default class ConcretePuzzle extends Puzzle {
  private monkeys = [{
    items: [61],
    operation: (old: number) => old * 11,
    test: (item: number) => (item % 5 === 0) ? 7 : 4
  },
  {
    items: [76, 92, 53, 93, 79, 86, 81],
    operation: (old: number) => old + 4,
    test: (item: number) => (item % 2 === 0) ? 2 : 6
  },
  {
    items: [91, 99],
    operation: (old: number) => old * 19,
    test: (item: number) => (item % 13 === 0) ? 5 : 0,
  },
  {
    items: [58, 67, 66],
    operation: (old: number) => old * old,
    test: (item: number) => (item % 7 === 0) ? 6 : 1
  },
  {
    items: [94, 54, 62, 73],
    operation: (old: number) => old + 1,
    test: (item: number) => (item % 19 === 0) ? 3 : 7
  },
  {
    items: [59, 95, 51, 58, 58],
    operation: (old: number) => old + 3,
    test: (item: number) => (item % 11 === 0) ? 0 : 4
  },
  {
    items: [87, 69, 92, 56, 91, 93, 88, 73],
    operation: (old: number) => old + 8,
    test: (item: number) => (item % 3 === 0) ? 5 : 2
  },
  {
    items: [71, 57, 86, 67, 96, 95],
    operation: (old: number) => old + 7,
    test: (item: number) => (item % 17 === 0) ? 3 : 1
  }
  ];

  public solveFirst(): string {
    const monkeys = cloneDeep(this.monkeys);
    const inspectCount = Array.from({ length: monkeys.length }, () => 0);

    for (let round = 1; round <= 20; round++) {
      for (let i = 0; i < monkeys.length; i++) {
        for (let j = 0; j < monkeys[i].items.length; j++) {
          // inspect
          const newValue = Math.floor(monkeys[i].operation(monkeys[i].items[j]) / 3);
          const target = monkeys[i].test(newValue);
          monkeys[target].items.push(newValue);
          inspectCount[i] += 1;
        }
        monkeys[i].items = [];
      }
    }

    const sorted = inspectCount.sort((a, b) => b - a);
    return (sorted[0] * sorted[1]).toString();
  }

  public getFirstExpectedResult(): string {
    return '76728';
  }

  public solveSecond(): string {
    const monkeys = cloneDeep(this.monkeys);
    const moduloValue = 5 * 2 * 13 * 7 * 19 * 11 * 3 * 17;
    const inspectCount = Array.from({ length: monkeys.length }, () => 0);

    for (let round = 1; round <= 10000; round++) {
      for (let i = 0; i < monkeys.length; i++) {
        for (let j = 0; j < monkeys[i].items.length; j++) {
          // inspect
          const newValue = monkeys[i].operation(monkeys[i].items[j]) % moduloValue;
          const target = monkeys[i].test(newValue);
          monkeys[target].items.push(newValue);
          inspectCount[i] += 1;
        }
        monkeys[i].items = [];
      }
    }

    const sorted = inspectCount.sort((a, b) => b - a);
    return (sorted[0] * sorted[1]).toString();
  }

  public getSecondExpectedResult(): string {
    return '21553910156';
  }
}
